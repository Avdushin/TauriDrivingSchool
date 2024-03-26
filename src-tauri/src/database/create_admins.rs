use std::env;

use sqlx::{Error, PgPool};

pub async fn create_administrator(pool: &PgPool) -> Result<(), Error> {
    let admin_username =
        env::var("ADMIN_USERNAME").expect("ADMIN_USERNAME должен быть установлен в файле .env");
    let admin_email =
        env::var("ADMIN_EMAIL").expect("ADMIN_EMAIL должен быть установлен в файле .env");
    let admin_password =
        env::var("ADMIN_PASSWORD").expect("ADMIN_PASSWORD должен быть установлен в файле .env");

    // Проверяем, существует ли администратор с заданным именем пользователя или email
    let existing_admin = sqlx::query("SELECT 1 FROM administrators WHERE username = $1 OR email = $2")
        .bind(&admin_username)
        .bind(&admin_email)
        .fetch_optional(pool)
        .await?;

    // Если администратор уже существует, просто выходим из функции
    if existing_admin.is_some() {
        return Ok(());
    }

    // Если администратор не существует, вставляем его в базу данных
    sqlx::query(
        "INSERT INTO administrators (username, email, password, role) VALUES ($1, $2, $3, 'admin')"
    )
    .bind(&admin_username)
    .bind(&admin_email)
    .bind(&admin_password)
    .execute(pool)
    .await?;

    Ok(())
}