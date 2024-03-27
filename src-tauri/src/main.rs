// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod auth;
mod database;

use crate::database::create_tables::create_tables;
use auth::auth::{authenticate_user, fetch_user_data, register_student, DbPool as authPool};

use sqlx::postgres::PgPoolOptions;
use std::env;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .connect(&database_url)
        .await
        .expect("Failed to connect to the database");

    // Создание таблиц БД
    if let Err(e) = create_tables(&pool).await {
        eprintln!("Failed to create tables: {}", e);
        return;
    }

    // Создание администратора
    if let Err(e) = database::create_admins::create_administrator(&pool).await {
        eprintln!("Failed to create admins: {}", e);
        return;
    }

    tauri::Builder::default()
        .manage(authPool(pool.clone()))
        .invoke_handler(tauri::generate_handler![
            register_student,
            authenticate_user,
            fetch_user_data,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
