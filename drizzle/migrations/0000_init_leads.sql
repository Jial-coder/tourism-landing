CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"locale" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"country" text,
	"travel_dates" text NOT NULL,
	"duration" integer NOT NULL,
	"party_size" integer NOT NULL,
	"interests" jsonb,
	"budget_range" text,
	"preferred_contact" text NOT NULL,
	"message" text,
	"source_path" text NOT NULL,
	"ip_hash" text,
	"user_agent" text
);
