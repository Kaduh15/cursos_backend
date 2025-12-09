CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" text NOT NULL,
	"update_at" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
