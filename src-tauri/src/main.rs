// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;

use sqlx::postgres::PgPoolOptions;
use std::env;
use tokio;

fn main() {
    let rt = tokio::runtime::Runtime::new().expect("Failed to create Tokio runtime");

    rt.block_on(async {
        dotenv::dotenv().ok();
        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        let pool = PgPoolOptions::new()
            .connect(&database_url)
            .await
            .expect("Failed to connect to the database");

        // Создание таблиц в базе данных
        database::create_tables::create_tables(&pool).await.expect("Failed to create tables");

        // Запуск Tauri приложения
        tauri::Builder::default()
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    });
}
