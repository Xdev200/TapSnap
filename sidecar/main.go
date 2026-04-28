package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

type GameResult struct {
	Score    int     `json:"score"`
	Accuracy float64 `json:"accuracy"`
	LevelID  int     `json:"level_id"`
}

var db *sql.DB

func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "./neon_pulse.db")
	if err != nil {
		log.Fatal(err)
	}

	sqlStmt := `
	CREATE TABLE IF NOT EXISTS player_stats (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		level_id INTEGER,
		score INTEGER,
		accuracy REAL,
		timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
	);`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}
}

func main() {
	initDB()
	defer db.Close()

	// Simple HTTP server for local IPC fallback or use as sidecar
	http.HandleFunc("/save", saveResult)
	http.HandleFunc("/stats", getStats)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Go Sidecar Pulse starting on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func saveResult(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var res GameResult
	err := json.NewDecoder(r.Body).Decode(&res)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("INSERT INTO player_stats (level_id, score, accuracy) VALUES (?, ?, ?)",
		res.LevelID, res.Score, res.Accuracy)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func getStats(w http.ResponseWriter, r *http.Request) {
	// Logic to fetch stats...
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
