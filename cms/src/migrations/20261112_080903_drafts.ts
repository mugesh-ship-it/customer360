import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_visual_style" AS ENUM('plain', 'framed', 'banner');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_approach_arrangement" AS ENUM('stepsLeft', 'imageLeft');
  CREATE TYPE "public"."enum__pages_v_blocks_team_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_split_intro_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_cards_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_nodes" AS ENUM('1', '3');
  CREATE TYPE "public"."enum__pages_v_version_page_background" AS ENUM('page', 'light');
  CREATE TYPE "public"."enum__pages_v_version_seo_page_type" AS ENUM('WebPage', 'AboutPage', 'ContactPage', 'FAQPage', 'CollectionPage', 'ItemPage');
  CREATE TYPE "public"."enum__pages_v_version_seo_change_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"highlight" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"decor_image_id" integer,
  	"visual_style" "enum__pages_v_blocks_hero_visual_style" DEFAULT 'plain',
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_marquee_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"height" numeric DEFAULT 48,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"speed" numeric DEFAULT 40,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_statement_background" DEFAULT 'page',
  	"tag" varchar,
  	"text" varchar,
  	"highlights" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_wheel_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_wheel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"background_left_id" integer,
  	"background_right_id" integer,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"illustration_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_global_reach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"turn_video_id" integer,
  	"turn_video_mobile_id" integer,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"illustration_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_card_grid_background" DEFAULT 'tint',
  	"tag" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_approach_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"illustration_id" integer,
  	"arrangement" "enum__pages_v_blocks_approach_arrangement" DEFAULT 'stepsLeft',
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_team_background" DEFAULT 'surface',
  	"tag" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_case_studies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"testimonial_id" integer,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon_id" integer,
  	"description" varchar,
  	"highlighted" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_split_intro_image_position" DEFAULT 'right',
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_icon_cards_background" DEFAULT 'tint',
  	"tag" varchar,
  	"heading" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"background_left_id" integer,
  	"background_right_id" integer,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nodes" "enum__pages_v_blocks_divider_nodes" DEFAULT '1',
  	"line_up" boolean DEFAULT true,
  	"line_down" boolean DEFAULT true,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_case_study_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"show_filters" boolean DEFAULT true,
  	"all_label" varchar DEFAULT 'All',
  	"per_page" numeric DEFAULT 6,
  	"empty_text" varchar DEFAULT 'No case studies for this service yet.',
  	"pagination_label" varchar DEFAULT 'Case study pages',
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_page_background" "enum__pages_v_version_page_background" DEFAULT 'page',
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keyword" varchar,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_seo_nofollow" boolean DEFAULT false,
  	"version_seo_hide_from_sitemap" boolean DEFAULT false,
  	"version_seo_canonical" varchar,
  	"version_seo_page_type" "enum__pages_v_version_seo_page_type" DEFAULT 'WebPage',
  	"version_seo_change_frequency" "enum__pages_v_version_seo_change_frequency" DEFAULT 'monthly',
  	"version_seo_priority" numeric DEFAULT 0.7,
  	"version_seo_breadcrumb_label" varchar,
  	"version_seo_schema" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"testimonials_id" integer,
  	"team_profiles_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "_case_studies_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_service_id" integer,
  	"version_url" varchar,
  	"version_excerpt" varchar,
  	"version_client" varchar,
  	"version_industry" varchar,
  	"version_duration" varchar,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_logo_marquee_logos" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pages_blocks_logo_marquee_logos" ALTER COLUMN "logo_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_services_wheel_services" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_services_wheel" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_about_banner" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_testimonials" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_global_reach" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_values_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_values" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_approach_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_approach" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_grid" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_case_studies" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_featured_testimonial" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_featured_testimonial" ALTER COLUMN "testimonial_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_benefits_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_benefits" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_split_intro" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_icon_cards_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_icon_cards" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_icon_list_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_icon_list" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "case_studies_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "case_studies_results" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "case_studies_results" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "case_studies" ADD COLUMN "_status" "enum_case_studies_status" DEFAULT 'draft';
  -- Everything already on the site stays live: existing pages and case studies start as published.
  UPDATE "pages" SET "_status" = 'published';
  UPDATE "case_studies" SET "_status" = 'published';
  -- Vercel Blob field; the initial migration missed it, and an earlier schema push may have created it.
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_decor_image_id_media_id_fk" FOREIGN KEY ("decor_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_marquee_logos" ADD CONSTRAINT "_pages_v_blocks_logo_marquee_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_marquee_logos" ADD CONSTRAINT "_pages_v_blocks_logo_marquee_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_marquee" ADD CONSTRAINT "_pages_v_blocks_logo_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_wheel_services" ADD CONSTRAINT "_pages_v_blocks_services_wheel_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_wheel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_wheel" ADD CONSTRAINT "_pages_v_blocks_services_wheel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_banner" ADD CONSTRAINT "_pages_v_blocks_about_banner_background_left_id_media_id_fk" FOREIGN KEY ("background_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_banner" ADD CONSTRAINT "_pages_v_blocks_about_banner_background_right_id_media_id_fk" FOREIGN KEY ("background_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_banner" ADD CONSTRAINT "_pages_v_blocks_about_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_global_reach" ADD CONSTRAINT "_pages_v_blocks_global_reach_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_global_reach" ADD CONSTRAINT "_pages_v_blocks_global_reach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_turn_video_id_media_id_fk" FOREIGN KEY ("turn_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_turn_video_mobile_id_media_id_fk" FOREIGN KEY ("turn_video_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values_items" ADD CONSTRAINT "_pages_v_blocks_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values" ADD CONSTRAINT "_pages_v_blocks_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_values" ADD CONSTRAINT "_pages_v_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_approach_items" ADD CONSTRAINT "_pages_v_blocks_approach_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_approach" ADD CONSTRAINT "_pages_v_blocks_approach_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_approach" ADD CONSTRAINT "_pages_v_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_grid" ADD CONSTRAINT "_pages_v_blocks_service_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_studies" ADD CONSTRAINT "_pages_v_blocks_case_studies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_grid" ADD CONSTRAINT "_pages_v_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_testimonial" ADD CONSTRAINT "_pages_v_blocks_featured_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_testimonial" ADD CONSTRAINT "_pages_v_blocks_featured_testimonial_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_testimonial" ADD CONSTRAINT "_pages_v_blocks_featured_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_items" ADD CONSTRAINT "_pages_v_blocks_benefits_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_items" ADD CONSTRAINT "_pages_v_blocks_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits" ADD CONSTRAINT "_pages_v_blocks_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits" ADD CONSTRAINT "_pages_v_blocks_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_intro" ADD CONSTRAINT "_pages_v_blocks_split_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_intro" ADD CONSTRAINT "_pages_v_blocks_split_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_cards_cards" ADD CONSTRAINT "_pages_v_blocks_icon_cards_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_cards_cards" ADD CONSTRAINT "_pages_v_blocks_icon_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_cards" ADD CONSTRAINT "_pages_v_blocks_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list_items" ADD CONSTRAINT "_pages_v_blocks_icon_list_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list_items" ADD CONSTRAINT "_pages_v_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list" ADD CONSTRAINT "_pages_v_blocks_icon_list_background_left_id_media_id_fk" FOREIGN KEY ("background_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list" ADD CONSTRAINT "_pages_v_blocks_icon_list_background_right_id_media_id_fk" FOREIGN KEY ("background_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list" ADD CONSTRAINT "_pages_v_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_divider" ADD CONSTRAINT "_pages_v_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_list" ADD CONSTRAINT "_pages_v_blocks_case_study_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_profiles_fk" FOREIGN KEY ("team_profiles_id") REFERENCES "public"."team_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_tags" ADD CONSTRAINT "_case_studies_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_results" ADD CONSTRAINT "_case_studies_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_service_id_services_id_fk" FOREIGN KEY ("version_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_decor_image_idx" ON "_pages_v_blocks_hero" USING btree ("decor_image_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_logos_order_idx" ON "_pages_v_blocks_logo_marquee_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_marquee_logos_parent_id_idx" ON "_pages_v_blocks_logo_marquee_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_logos_logo_idx" ON "_pages_v_blocks_logo_marquee_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_order_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_marquee_parent_id_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_path_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_wheel_services_order_idx" ON "_pages_v_blocks_services_wheel_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_wheel_services_parent_id_idx" ON "_pages_v_blocks_services_wheel_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_wheel_order_idx" ON "_pages_v_blocks_services_wheel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_wheel_parent_id_idx" ON "_pages_v_blocks_services_wheel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_wheel_path_idx" ON "_pages_v_blocks_services_wheel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_banner_order_idx" ON "_pages_v_blocks_about_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_banner_parent_id_idx" ON "_pages_v_blocks_about_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_banner_path_idx" ON "_pages_v_blocks_about_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_banner_background_left_idx" ON "_pages_v_blocks_about_banner" USING btree ("background_left_id");
  CREATE INDEX "_pages_v_blocks_about_banner_background_right_idx" ON "_pages_v_blocks_about_banner" USING btree ("background_right_id");
  CREATE INDEX "_pages_v_blocks_features_items_order_idx" ON "_pages_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_items_parent_id_idx" ON "_pages_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_illustration_idx" ON "_pages_v_blocks_features_items" USING btree ("illustration_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_global_reach_order_idx" ON "_pages_v_blocks_global_reach" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_global_reach_parent_id_idx" ON "_pages_v_blocks_global_reach" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_global_reach_path_idx" ON "_pages_v_blocks_global_reach" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_global_reach_image_idx" ON "_pages_v_blocks_global_reach" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_image_idx" ON "_pages_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cta_turn_video_idx" ON "_pages_v_blocks_cta" USING btree ("turn_video_id");
  CREATE INDEX "_pages_v_blocks_cta_turn_video_mobile_idx" ON "_pages_v_blocks_cta" USING btree ("turn_video_mobile_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_illustration_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("illustration_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_values_items_order_idx" ON "_pages_v_blocks_values_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_items_parent_id_idx" ON "_pages_v_blocks_values_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_order_idx" ON "_pages_v_blocks_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_values_parent_id_idx" ON "_pages_v_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_values_path_idx" ON "_pages_v_blocks_values" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_values_image_idx" ON "_pages_v_blocks_values" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_approach_items_order_idx" ON "_pages_v_blocks_approach_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_approach_items_parent_id_idx" ON "_pages_v_blocks_approach_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_approach_order_idx" ON "_pages_v_blocks_approach" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_approach_parent_id_idx" ON "_pages_v_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_approach_path_idx" ON "_pages_v_blocks_approach" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_approach_illustration_idx" ON "_pages_v_blocks_approach" USING btree ("illustration_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_grid_order_idx" ON "_pages_v_blocks_service_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_grid_parent_id_idx" ON "_pages_v_blocks_service_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_grid_path_idx" ON "_pages_v_blocks_service_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_studies_order_idx" ON "_pages_v_blocks_case_studies" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_studies_parent_id_idx" ON "_pages_v_blocks_case_studies" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_studies_path_idx" ON "_pages_v_blocks_case_studies" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_grid_order_idx" ON "_pages_v_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_grid_parent_id_idx" ON "_pages_v_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_grid_path_idx" ON "_pages_v_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_testimonial_order_idx" ON "_pages_v_blocks_featured_testimonial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_testimonial_parent_id_idx" ON "_pages_v_blocks_featured_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_testimonial_path_idx" ON "_pages_v_blocks_featured_testimonial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_testimonial_testimonial_idx" ON "_pages_v_blocks_featured_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "_pages_v_blocks_featured_testimonial_image_idx" ON "_pages_v_blocks_featured_testimonial" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_benefits_items_order_idx" ON "_pages_v_blocks_benefits_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_items_parent_id_idx" ON "_pages_v_blocks_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_items_icon_idx" ON "_pages_v_blocks_benefits_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_benefits_order_idx" ON "_pages_v_blocks_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_parent_id_idx" ON "_pages_v_blocks_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_path_idx" ON "_pages_v_blocks_benefits" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_benefits_image_idx" ON "_pages_v_blocks_benefits" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_split_intro_order_idx" ON "_pages_v_blocks_split_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_intro_parent_id_idx" ON "_pages_v_blocks_split_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_intro_path_idx" ON "_pages_v_blocks_split_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_intro_image_idx" ON "_pages_v_blocks_split_intro" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_icon_cards_cards_order_idx" ON "_pages_v_blocks_icon_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_cards_cards_parent_id_idx" ON "_pages_v_blocks_icon_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_cards_cards_icon_idx" ON "_pages_v_blocks_icon_cards_cards" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_icon_cards_order_idx" ON "_pages_v_blocks_icon_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_cards_parent_id_idx" ON "_pages_v_blocks_icon_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_cards_path_idx" ON "_pages_v_blocks_icon_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_icon_list_items_order_idx" ON "_pages_v_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_list_items_parent_id_idx" ON "_pages_v_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_list_items_icon_idx" ON "_pages_v_blocks_icon_list_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_icon_list_order_idx" ON "_pages_v_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_list_parent_id_idx" ON "_pages_v_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_list_path_idx" ON "_pages_v_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_icon_list_background_left_idx" ON "_pages_v_blocks_icon_list" USING btree ("background_left_id");
  CREATE INDEX "_pages_v_blocks_icon_list_background_right_idx" ON "_pages_v_blocks_icon_list" USING btree ("background_right_id");
  CREATE INDEX "_pages_v_blocks_divider_order_idx" ON "_pages_v_blocks_divider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_divider_parent_id_idx" ON "_pages_v_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_divider_path_idx" ON "_pages_v_blocks_divider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_study_list_order_idx" ON "_pages_v_blocks_case_study_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_study_list_parent_id_idx" ON "_pages_v_blocks_case_study_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_study_list_path_idx" ON "_pages_v_blocks_case_study_list" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_team_profiles_id_idx" ON "_pages_v_rels" USING btree ("team_profiles_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_case_studies_id_idx" ON "_pages_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX "_case_studies_v_version_tags_order_idx" ON "_case_studies_v_version_tags" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_tags_parent_id_idx" ON "_case_studies_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_version_results_order_idx" ON "_case_studies_v_version_results" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_results_parent_id_idx" ON "_case_studies_v_version_results" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_version_service_idx" ON "_case_studies_v" USING btree ("version_service_id");
  CREATE INDEX "_case_studies_v_version_version_cover_image_idx" ON "_case_studies_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_case_studies_v_version_meta_version_meta_image_idx" ON "_case_studies_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_marquee_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_wheel_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_wheel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_global_reach" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_values_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_approach_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_approach" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_case_studies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_featured_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_benefits_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_split_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_icon_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_icon_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_icon_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_icon_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_divider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_case_study_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v_version_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_case_studies_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_marquee_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_services_wheel_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services_wheel" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_about_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_global_reach" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_values_items" CASCADE;
  DROP TABLE "_pages_v_blocks_values" CASCADE;
  DROP TABLE "_pages_v_blocks_approach_items" CASCADE;
  DROP TABLE "_pages_v_blocks_approach" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_service_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_case_studies" CASCADE;
  DROP TABLE "_pages_v_blocks_product_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_testimonial" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_items" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_split_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_list" CASCADE;
  DROP TABLE "_pages_v_blocks_divider" CASCADE;
  DROP TABLE "_pages_v_blocks_case_study_list" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "_case_studies_v_version_tags" CASCADE;
  DROP TABLE "_case_studies_v_version_results" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP INDEX "pages__status_idx";
  DROP INDEX "case_studies__status_idx";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_logo_marquee_logos" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages_blocks_logo_marquee_logos" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_services_wheel_services" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_services_wheel" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_about_banner" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_features_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_testimonials" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_global_reach" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_values_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_values" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_approach_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_approach" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_team" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_grid" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_case_studies" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_product_grid" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_featured_testimonial" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_featured_testimonial" ALTER COLUMN "testimonial_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_benefits_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_benefits" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_split_intro" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_icon_cards_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_icon_cards" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_icon_list_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_icon_list" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "case_studies_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "case_studies_results" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "case_studies_results" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "case_studies" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN "_status";
  ALTER TABLE "case_studies" DROP COLUMN "_status";
  -- media._objectkey is kept: the Vercel Blob plugin needs it.
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_visual_style";
  DROP TYPE "public"."enum__pages_v_blocks_statement_background";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_approach_arrangement";
  DROP TYPE "public"."enum__pages_v_blocks_team_background";
  DROP TYPE "public"."enum__pages_v_blocks_split_intro_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_icon_cards_background";
  DROP TYPE "public"."enum__pages_v_blocks_divider_nodes";
  DROP TYPE "public"."enum__pages_v_version_page_background";
  DROP TYPE "public"."enum__pages_v_version_seo_page_type";
  DROP TYPE "public"."enum__pages_v_version_seo_change_frequency";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_version_status";`)
}
