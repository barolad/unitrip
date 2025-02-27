ALTER TABLE "organizer" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizer" ADD CONSTRAINT "organizer_username_unique" UNIQUE("username");