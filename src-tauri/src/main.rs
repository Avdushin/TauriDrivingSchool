mod auth;
mod database;

use auth::auth::DbPool as authPool;
use auth::auth::{authenticate_user, register_student};
// use database::create_tables::DbPool;

use sqlx::postgres::PgPoolOptions;
use std::env;
use tokio::runtime::Runtime;

fn main() {
    dotenv::dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let rt = Runtime::new().expect("Failed to create Tokio runtime");

    rt.block_on(async {
        let pool = PgPoolOptions::new()
            .connect(&database_url)
            .await
            .expect("Failed to connect to the database");

        println!("Creating tables...");
        if let Err(e) = database::create_tables::create_tables(&pool).await {
            eprintln!("Failed to create tables: {}", e);
            return;
        }
        println!("Tables created successfully.");

        tauri::Builder::default()
            .manage(authPool(pool.clone()))
            .invoke_handler(tauri::generate_handler![
                register_student,
                authenticate_user
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    });
}
