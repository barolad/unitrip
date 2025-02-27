CREATE TABLE "event" (
	"id" uuid PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"edited_at" timestamp DEFAULT now() NOT NULL,
	"organizer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizer" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"edited_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_organizer_id_organizer_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."organizer"("id") ON DELETE no action ON UPDATE no action;