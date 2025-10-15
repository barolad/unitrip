CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image_url" varchar(500)[],
	"date" timestamp NOT NULL,
	"start_coordinates" varchar(255),
	"end_coordinates" varchar(255),
	"route_link" varchar(500),
	"difficulty" smallint DEFAULT 1 NOT NULL,
	"is_paid" boolean DEFAULT false,
	"source_link" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
