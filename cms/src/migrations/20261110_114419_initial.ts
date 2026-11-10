import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_visual_style" AS ENUM('plain', 'framed', 'banner');
  CREATE TYPE "public"."enum_pages_blocks_statement_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum_pages_blocks_approach_arrangement" AS ENUM('stepsLeft', 'imageLeft');
  CREATE TYPE "public"."enum_pages_blocks_team_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum_pages_blocks_split_intro_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_icon_cards_background" AS ENUM('page', 'surface', 'tint', 'white');
  CREATE TYPE "public"."enum_pages_blocks_divider_nodes" AS ENUM('1', '3');
  CREATE TYPE "public"."enum_pages_page_background" AS ENUM('page', 'light');
  CREATE TYPE "public"."enum_pages_seo_page_type" AS ENUM('WebPage', 'AboutPage', 'ContactPage', 'FAQPage', 'CollectionPage', 'ItemPage');
  CREATE TYPE "public"."enum_pages_seo_change_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_products_status" AS ENUM('upcoming', 'available');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_site_settings_organization_type" AS ENUM('Organization', 'Corporation', 'LocalBusiness', 'ProfessionalService');
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"highlight" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"decor_image_id" integer,
  	"visual_style" "enum_pages_blocks_hero_visual_style" DEFAULT 'plain',
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_marquee_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"height" numeric DEFAULT 48,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_logo_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"speed" numeric DEFAULT 40,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_statement_background" DEFAULT 'page',
  	"tag" varchar,
  	"text" varchar NOT NULL,
  	"highlights" varchar,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_wheel_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_services_wheel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"background_left_id" integer,
  	"background_right_id" integer,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"illustration_id" integer
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_global_reach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"turn_video_id" integer,
  	"turn_video_mobile_id" integer,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"illustration_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_card_grid_background" DEFAULT 'tint',
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_approach_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"illustration_id" integer,
  	"arrangement" "enum_pages_blocks_approach_arrangement" DEFAULT 'stepsLeft',
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_team_background" DEFAULT 'surface',
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"button_new_tab" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_case_studies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"testimonial_id" integer NOT NULL,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon_id" integer,
  	"description" varchar,
  	"highlighted" boolean
  );
  
  CREATE TABLE "pages_blocks_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"image_id" integer,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"text" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_split_intro_image_position" DEFAULT 'right',
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_icon_cards_background" DEFAULT 'tint',
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar NOT NULL,
  	"background_left_id" integer,
  	"background_right_id" integer,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nodes" "enum_pages_blocks_divider_nodes" DEFAULT '1',
  	"line_up" boolean DEFAULT true,
  	"line_down" boolean DEFAULT true,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_case_study_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"heading" varchar,
  	"show_filters" boolean DEFAULT true,
  	"all_label" varchar DEFAULT 'All',
  	"per_page" numeric DEFAULT 6,
  	"empty_text" varchar DEFAULT 'No case studies for this service yet.',
  	"pagination_label" varchar DEFAULT 'Case study pages',
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"page_background" "enum_pages_page_background" DEFAULT 'page',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keyword" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"seo_nofollow" boolean DEFAULT false,
  	"seo_hide_from_sitemap" boolean DEFAULT false,
  	"seo_canonical" varchar,
  	"seo_page_type" "enum_pages_seo_page_type" DEFAULT 'WebPage',
  	"seo_change_frequency" "enum_pages_seo_change_frequency" DEFAULT 'monthly',
  	"seo_priority" numeric DEFAULT 0.7,
  	"seo_breadcrumb_label" varchar,
  	"seo_schema" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
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
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"summary" varchar,
  	"illustration_id" integer,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"status" "enum_products_status" DEFAULT 'upcoming',
  	"summary" varchar,
  	"icon_id" integer,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"service_id" integer,
  	"url" varchar,
  	"excerpt" varchar,
  	"client" varchar,
  	"industry" varchar,
  	"duration" varchar,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"headline" varchar NOT NULL,
  	"quote" varchar NOT NULL,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"photo_id" integer NOT NULL,
  	"linkedin" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"type" "enum_redirects_type" DEFAULT '301' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"products_id" integer,
  	"case_studies_id" integer,
  	"testimonials_id" integer,
  	"team_profiles_id" integer,
  	"media_id" integer,
  	"redirects_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar NOT NULL,
  	"logo_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_heading" varchar DEFAULT 'Contact Us',
  	"social_heading" varchar DEFAULT 'Social Media',
  	"brand_name" varchar,
  	"copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_organization_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Customer360' NOT NULL,
  	"site_url" varchar DEFAULT 'https://www.customer360.com' NOT NULL,
  	"title_template" varchar DEFAULT '%s | Customer360',
  	"language" varchar DEFAULT 'en',
  	"locale" varchar DEFAULT 'en_GB',
  	"default_title" varchar,
  	"default_description" varchar,
  	"default_share_image_id" integer,
  	"favicon_id" integer,
  	"apple_touch_icon_id" integer,
  	"twitter_handle" varchar,
  	"theme_color" varchar,
  	"allow_indexing" boolean DEFAULT true,
  	"google_verification" varchar,
  	"bing_verification" varchar,
  	"robots_extra" varchar,
  	"llms_summary" varchar,
  	"organization_type" "enum_site_settings_organization_type" DEFAULT 'Organization',
  	"organization_legal_name" varchar,
  	"organization_logo_id" integer,
  	"organization_description" varchar,
  	"organization_email" varchar,
  	"organization_phone" varchar,
  	"organization_founding_year" varchar,
  	"organization_address_street" varchar,
  	"organization_address_city" varchar,
  	"organization_address_region" varchar,
  	"organization_address_postal_code" varchar,
  	"organization_address_country" varchar,
  	"ga_id" varchar,
  	"gtm_id" varchar,
  	"meta_pixel_id" varchar,
  	"linkedin_partner_id" varchar,
  	"hotjar_id" varchar,
  	"clarity_id" varchar,
  	"head_code" varchar,
  	"body_code" varchar,
  	"not_found_heading" varchar DEFAULT 'Page not found',
  	"not_found_text" varchar DEFAULT 'The page you are looking for has moved or no longer exists.',
  	"not_found_button_label" varchar,
  	"not_found_button_url" varchar,
  	"not_found_button_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "design" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_s25" varchar DEFAULT '#f5faff' NOT NULL,
  	"primary_s50" varchar DEFAULT '#eff8ff' NOT NULL,
  	"primary_s100" varchar DEFAULT '#d1e9ff' NOT NULL,
  	"primary_s200" varchar DEFAULT '#b2ddff' NOT NULL,
  	"primary_s300" varchar DEFAULT '#84caff' NOT NULL,
  	"primary_s400" varchar DEFAULT '#53b1fd' NOT NULL,
  	"primary_s500" varchar DEFAULT '#2e90fa' NOT NULL,
  	"primary_s600" varchar DEFAULT '#1570ef' NOT NULL,
  	"primary_s700" varchar DEFAULT '#175cd3' NOT NULL,
  	"primary_s800" varchar DEFAULT '#0f53c9' NOT NULL,
  	"primary_s900" varchar DEFAULT '#194185' NOT NULL,
  	"primary_s950" varchar DEFAULT '#102a56' NOT NULL,
  	"neutral_s25" varchar DEFAULT '#fdfdfd' NOT NULL,
  	"neutral_s50" varchar DEFAULT '#fafafa' NOT NULL,
  	"neutral_s300" varchar DEFAULT '#d5d7da' NOT NULL,
  	"neutral_s400" varchar DEFAULT '#a4a7ae' NOT NULL,
  	"neutral_s500" varchar DEFAULT '#717680' NOT NULL,
  	"neutral_s600" varchar DEFAULT '#535862' NOT NULL,
  	"neutral_s700" varchar DEFAULT '#414651' NOT NULL,
  	"neutral_s800" varchar DEFAULT '#252b37' NOT NULL,
  	"neutral_s900" varchar DEFAULT '#181d27' NOT NULL,
  	"base_page" varchar DEFAULT '#f5f5f5' NOT NULL,
  	"base_surface" varchar DEFAULT '#efefef' NOT NULL,
  	"base_ink" varchar DEFAULT '#1f2937' NOT NULL,
  	"base_muted" varchar DEFAULT '#6b7280' NOT NULL,
  	"body_family" varchar DEFAULT 'Plus Jakarta Sans' NOT NULL,
  	"body_weights" varchar DEFAULT '300;500;600;700',
  	"body_fallback" varchar DEFAULT 'ui-sans-serif, system-ui, sans-serif',
  	"brand_family" varchar DEFAULT 'Piazzolla' NOT NULL,
  	"brand_weights" varchar DEFAULT '700',
  	"brand_fallback" varchar DEFAULT 'Georgia, serif',
  	"accent_family" varchar DEFAULT 'Sanchez' NOT NULL,
  	"accent_weights" varchar DEFAULT '',
  	"accent_fallback" varchar DEFAULT 'Georgia, serif',
  	"type_scale_display_min" numeric DEFAULT 72 NOT NULL,
  	"type_scale_display_max" numeric DEFAULT 198.88 NOT NULL,
  	"type_scale_h1_min" numeric DEFAULT 40 NOT NULL,
  	"type_scale_h1_max" numeric DEFAULT 72 NOT NULL,
  	"type_scale_h1_compact_min" numeric DEFAULT 40 NOT NULL,
  	"type_scale_h1_compact_max" numeric DEFAULT 64 NOT NULL,
  	"type_scale_h2_min" numeric DEFAULT 26 NOT NULL,
  	"type_scale_h2_max" numeric DEFAULT 42 NOT NULL,
  	"type_scale_h3_min" numeric DEFAULT 24 NOT NULL,
  	"type_scale_h3_max" numeric DEFAULT 24 NOT NULL,
  	"type_scale_large_min" numeric DEFAULT 18 NOT NULL,
  	"type_scale_large_max" numeric DEFAULT 20 NOT NULL,
  	"type_scale_regular_min" numeric DEFAULT 16 NOT NULL,
  	"type_scale_regular_max" numeric DEFAULT 16 NOT NULL,
  	"type_scale_small_min" numeric DEFAULT 14 NOT NULL,
  	"type_scale_small_max" numeric DEFAULT 14 NOT NULL,
  	"containers_container_large" numeric DEFAULT 1280 NOT NULL,
  	"containers_container_medium" numeric DEFAULT 1056 NOT NULL,
  	"containers_container_small" numeric DEFAULT 832 NOT NULL,
  	"gutter_gutter_mobile" numeric DEFAULT 20 NOT NULL,
  	"gutter_gutter_tablet" numeric DEFAULT 40 NOT NULL,
  	"gutter_gutter_desktop" numeric DEFAULT 80 NOT NULL,
  	"section_section_small_mobile" numeric DEFAULT 48 NOT NULL,
  	"section_section_medium_mobile" numeric DEFAULT 64 NOT NULL,
  	"section_section_large_mobile" numeric DEFAULT 80 NOT NULL,
  	"section_section_small_desktop" numeric DEFAULT 64 NOT NULL,
  	"section_section_medium_desktop" numeric DEFAULT 96 NOT NULL,
  	"section_section_large_desktop" numeric DEFAULT 128 NOT NULL,
  	"buttons_button_height" numeric DEFAULT 44 NOT NULL,
  	"buttons_button_height_large" numeric DEFAULT 52 NOT NULL,
  	"buttons_radius_button" numeric DEFAULT 9999 NOT NULL,
  	"buttons_radius_card" numeric DEFAULT 24 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "case_study_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"listing_label" varchar DEFAULT 'Case Studies',
  	"listing_path" varchar DEFAULT '/case-studies',
  	"client_label" varchar DEFAULT 'Client',
  	"industry_label" varchar DEFAULT 'Industry',
  	"service_label" varchar DEFAULT 'Service',
  	"duration_label" varchar DEFAULT 'Timeline',
  	"results_label" varchar DEFAULT 'Key results',
  	"toc_label" varchar DEFAULT 'On this page',
  	"reading_time_label" varchar DEFAULT '{n} min read',
  	"related_tag" varchar DEFAULT 'More Success Stories',
  	"related_heading" varchar DEFAULT 'Keep Exploring Our Impact',
  	"related_count" numeric DEFAULT 4,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_decor_image_id_media_id_fk" FOREIGN KEY ("decor_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_marquee_logos" ADD CONSTRAINT "pages_blocks_logo_marquee_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_marquee_logos" ADD CONSTRAINT "pages_blocks_logo_marquee_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_marquee" ADD CONSTRAINT "pages_blocks_logo_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_wheel_services" ADD CONSTRAINT "pages_blocks_services_wheel_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_wheel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_wheel" ADD CONSTRAINT "pages_blocks_services_wheel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_banner" ADD CONSTRAINT "pages_blocks_about_banner_background_left_id_media_id_fk" FOREIGN KEY ("background_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_banner" ADD CONSTRAINT "pages_blocks_about_banner_background_right_id_media_id_fk" FOREIGN KEY ("background_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_banner" ADD CONSTRAINT "pages_blocks_about_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_global_reach" ADD CONSTRAINT "pages_blocks_global_reach_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_global_reach" ADD CONSTRAINT "pages_blocks_global_reach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_turn_video_id_media_id_fk" FOREIGN KEY ("turn_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_turn_video_mobile_id_media_id_fk" FOREIGN KEY ("turn_video_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values_items" ADD CONSTRAINT "pages_blocks_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_values" ADD CONSTRAINT "pages_blocks_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_values" ADD CONSTRAINT "pages_blocks_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_approach_items" ADD CONSTRAINT "pages_blocks_approach_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_approach" ADD CONSTRAINT "pages_blocks_approach_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_approach" ADD CONSTRAINT "pages_blocks_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_grid" ADD CONSTRAINT "pages_blocks_service_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_studies" ADD CONSTRAINT "pages_blocks_case_studies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_grid" ADD CONSTRAINT "pages_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_testimonial" ADD CONSTRAINT "pages_blocks_featured_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_testimonial" ADD CONSTRAINT "pages_blocks_featured_testimonial_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_testimonial" ADD CONSTRAINT "pages_blocks_featured_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_items" ADD CONSTRAINT "pages_blocks_benefits_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_items" ADD CONSTRAINT "pages_blocks_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits" ADD CONSTRAINT "pages_blocks_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits" ADD CONSTRAINT "pages_blocks_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_intro" ADD CONSTRAINT "pages_blocks_split_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_intro" ADD CONSTRAINT "pages_blocks_split_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards_cards" ADD CONSTRAINT "pages_blocks_icon_cards_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards_cards" ADD CONSTRAINT "pages_blocks_icon_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_cards" ADD CONSTRAINT "pages_blocks_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list_items" ADD CONSTRAINT "pages_blocks_icon_list_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list_items" ADD CONSTRAINT "pages_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list" ADD CONSTRAINT "pages_blocks_icon_list_background_left_id_media_id_fk" FOREIGN KEY ("background_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list" ADD CONSTRAINT "pages_blocks_icon_list_background_right_id_media_id_fk" FOREIGN KEY ("background_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list" ADD CONSTRAINT "pages_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_divider" ADD CONSTRAINT "pages_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_list" ADD CONSTRAINT "pages_blocks_case_study_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_profiles_fk" FOREIGN KEY ("team_profiles_id") REFERENCES "public"."team_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_illustration_id_media_id_fk" FOREIGN KEY ("illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_tags" ADD CONSTRAINT "case_studies_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_results" ADD CONSTRAINT "case_studies_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_profiles" ADD CONSTRAINT "team_profiles_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_profiles_fk" FOREIGN KEY ("team_profiles_id") REFERENCES "public"."team_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_links" ADD CONSTRAINT "header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_contact_items" ADD CONSTRAINT "footer_contact_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_contact_items" ADD CONSTRAINT "footer_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_socials" ADD CONSTRAINT "footer_socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_socials" ADD CONSTRAINT "footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_organization_same_as" ADD CONSTRAINT "site_settings_organization_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_share_image_id_media_id_fk" FOREIGN KEY ("default_share_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_apple_touch_icon_id_media_id_fk" FOREIGN KEY ("apple_touch_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_organization_logo_id_media_id_fk" FOREIGN KEY ("organization_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_decor_image_idx" ON "pages_blocks_hero" USING btree ("decor_image_id");
  CREATE INDEX "pages_blocks_logo_marquee_logos_order_idx" ON "pages_blocks_logo_marquee_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_marquee_logos_parent_id_idx" ON "pages_blocks_logo_marquee_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_marquee_logos_logo_idx" ON "pages_blocks_logo_marquee_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_marquee_order_idx" ON "pages_blocks_logo_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_marquee_parent_id_idx" ON "pages_blocks_logo_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_marquee_path_idx" ON "pages_blocks_logo_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_wheel_services_order_idx" ON "pages_blocks_services_wheel_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_wheel_services_parent_id_idx" ON "pages_blocks_services_wheel_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_wheel_order_idx" ON "pages_blocks_services_wheel" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_wheel_parent_id_idx" ON "pages_blocks_services_wheel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_wheel_path_idx" ON "pages_blocks_services_wheel" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_banner_order_idx" ON "pages_blocks_about_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_banner_parent_id_idx" ON "pages_blocks_about_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_banner_path_idx" ON "pages_blocks_about_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_banner_background_left_idx" ON "pages_blocks_about_banner" USING btree ("background_left_id");
  CREATE INDEX "pages_blocks_about_banner_background_right_idx" ON "pages_blocks_about_banner" USING btree ("background_right_id");
  CREATE INDEX "pages_blocks_features_items_order_idx" ON "pages_blocks_features_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_items_parent_id_idx" ON "pages_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_items_illustration_idx" ON "pages_blocks_features_items" USING btree ("illustration_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_global_reach_order_idx" ON "pages_blocks_global_reach" USING btree ("_order");
  CREATE INDEX "pages_blocks_global_reach_parent_id_idx" ON "pages_blocks_global_reach" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_global_reach_path_idx" ON "pages_blocks_global_reach" USING btree ("_path");
  CREATE INDEX "pages_blocks_global_reach_image_idx" ON "pages_blocks_global_reach" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_image_idx" ON "pages_blocks_cta" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cta_turn_video_idx" ON "pages_blocks_cta" USING btree ("turn_video_id");
  CREATE INDEX "pages_blocks_cta_turn_video_mobile_idx" ON "pages_blocks_cta" USING btree ("turn_video_mobile_id");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_illustration_idx" ON "pages_blocks_card_grid_cards" USING btree ("illustration_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_values_items_order_idx" ON "pages_blocks_values_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_items_parent_id_idx" ON "pages_blocks_values_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_order_idx" ON "pages_blocks_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_values_parent_id_idx" ON "pages_blocks_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_values_path_idx" ON "pages_blocks_values" USING btree ("_path");
  CREATE INDEX "pages_blocks_values_image_idx" ON "pages_blocks_values" USING btree ("image_id");
  CREATE INDEX "pages_blocks_approach_items_order_idx" ON "pages_blocks_approach_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_approach_items_parent_id_idx" ON "pages_blocks_approach_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_approach_order_idx" ON "pages_blocks_approach" USING btree ("_order");
  CREATE INDEX "pages_blocks_approach_parent_id_idx" ON "pages_blocks_approach" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_approach_path_idx" ON "pages_blocks_approach" USING btree ("_path");
  CREATE INDEX "pages_blocks_approach_illustration_idx" ON "pages_blocks_approach" USING btree ("illustration_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_grid_order_idx" ON "pages_blocks_service_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_grid_parent_id_idx" ON "pages_blocks_service_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_grid_path_idx" ON "pages_blocks_service_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_studies_order_idx" ON "pages_blocks_case_studies" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_studies_parent_id_idx" ON "pages_blocks_case_studies" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_studies_path_idx" ON "pages_blocks_case_studies" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_grid_order_idx" ON "pages_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_grid_parent_id_idx" ON "pages_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_grid_path_idx" ON "pages_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_testimonial_order_idx" ON "pages_blocks_featured_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_testimonial_parent_id_idx" ON "pages_blocks_featured_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_testimonial_path_idx" ON "pages_blocks_featured_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_testimonial_testimonial_idx" ON "pages_blocks_featured_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "pages_blocks_featured_testimonial_image_idx" ON "pages_blocks_featured_testimonial" USING btree ("image_id");
  CREATE INDEX "pages_blocks_benefits_items_order_idx" ON "pages_blocks_benefits_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_items_parent_id_idx" ON "pages_blocks_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_items_icon_idx" ON "pages_blocks_benefits_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_benefits_order_idx" ON "pages_blocks_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_parent_id_idx" ON "pages_blocks_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_path_idx" ON "pages_blocks_benefits" USING btree ("_path");
  CREATE INDEX "pages_blocks_benefits_image_idx" ON "pages_blocks_benefits" USING btree ("image_id");
  CREATE INDEX "pages_blocks_split_intro_order_idx" ON "pages_blocks_split_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_intro_parent_id_idx" ON "pages_blocks_split_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_intro_path_idx" ON "pages_blocks_split_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_intro_image_idx" ON "pages_blocks_split_intro" USING btree ("image_id");
  CREATE INDEX "pages_blocks_icon_cards_cards_order_idx" ON "pages_blocks_icon_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_cards_cards_parent_id_idx" ON "pages_blocks_icon_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_cards_icon_idx" ON "pages_blocks_icon_cards_cards" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_icon_cards_order_idx" ON "pages_blocks_icon_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_cards_parent_id_idx" ON "pages_blocks_icon_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_cards_path_idx" ON "pages_blocks_icon_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_icon_list_items_order_idx" ON "pages_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_list_items_parent_id_idx" ON "pages_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_list_items_icon_idx" ON "pages_blocks_icon_list_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_icon_list_order_idx" ON "pages_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_list_parent_id_idx" ON "pages_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_list_path_idx" ON "pages_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_icon_list_background_left_idx" ON "pages_blocks_icon_list" USING btree ("background_left_id");
  CREATE INDEX "pages_blocks_icon_list_background_right_idx" ON "pages_blocks_icon_list" USING btree ("background_right_id");
  CREATE INDEX "pages_blocks_divider_order_idx" ON "pages_blocks_divider" USING btree ("_order");
  CREATE INDEX "pages_blocks_divider_parent_id_idx" ON "pages_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_divider_path_idx" ON "pages_blocks_divider" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_study_list_order_idx" ON "pages_blocks_case_study_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_study_list_parent_id_idx" ON "pages_blocks_case_study_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_study_list_path_idx" ON "pages_blocks_case_study_list" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_team_profiles_id_idx" ON "pages_rels" USING btree ("team_profiles_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_case_studies_id_idx" ON "pages_rels" USING btree ("case_studies_id");
  CREATE INDEX "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX "services_illustration_idx" ON "services" USING btree ("illustration_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "products_icon_idx" ON "products" USING btree ("icon_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "case_studies_tags_order_idx" ON "case_studies_tags" USING btree ("_order");
  CREATE INDEX "case_studies_tags_parent_id_idx" ON "case_studies_tags" USING btree ("_parent_id");
  CREATE INDEX "case_studies_results_order_idx" ON "case_studies_results" USING btree ("_order");
  CREATE INDEX "case_studies_results_parent_id_idx" ON "case_studies_results" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_service_idx" ON "case_studies" USING btree ("service_id");
  CREATE INDEX "case_studies_cover_image_idx" ON "case_studies" USING btree ("cover_image_id");
  CREATE INDEX "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "team_profiles_photo_idx" ON "team_profiles" USING btree ("photo_id");
  CREATE INDEX "team_profiles_updated_at_idx" ON "team_profiles" USING btree ("updated_at");
  CREATE INDEX "team_profiles_created_at_idx" ON "team_profiles" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_team_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("team_profiles_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_links_order_idx" ON "header_nav_links" USING btree ("_order");
  CREATE INDEX "header_nav_links_parent_id_idx" ON "header_nav_links" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_contact_items_order_idx" ON "footer_contact_items" USING btree ("_order");
  CREATE INDEX "footer_contact_items_parent_id_idx" ON "footer_contact_items" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_items_icon_idx" ON "footer_contact_items" USING btree ("icon_id");
  CREATE INDEX "footer_socials_order_idx" ON "footer_socials" USING btree ("_order");
  CREATE INDEX "footer_socials_parent_id_idx" ON "footer_socials" USING btree ("_parent_id");
  CREATE INDEX "footer_socials_icon_idx" ON "footer_socials" USING btree ("icon_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_organization_same_as_order_idx" ON "site_settings_organization_same_as" USING btree ("_order");
  CREATE INDEX "site_settings_organization_same_as_parent_id_idx" ON "site_settings_organization_same_as" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_share_image_idx" ON "site_settings" USING btree ("default_share_image_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_apple_touch_icon_idx" ON "site_settings" USING btree ("apple_touch_icon_id");
  CREATE INDEX "site_settings_organization_organization_logo_idx" ON "site_settings" USING btree ("organization_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_logo_marquee_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_marquee" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_services_wheel_services" CASCADE;
  DROP TABLE "pages_blocks_services_wheel" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_about_banner" CASCADE;
  DROP TABLE "pages_blocks_features_items" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_global_reach" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_values_items" CASCADE;
  DROP TABLE "pages_blocks_values" CASCADE;
  DROP TABLE "pages_blocks_approach_items" CASCADE;
  DROP TABLE "pages_blocks_approach" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_service_grid" CASCADE;
  DROP TABLE "pages_blocks_case_studies" CASCADE;
  DROP TABLE "pages_blocks_product_grid" CASCADE;
  DROP TABLE "pages_blocks_featured_testimonial" CASCADE;
  DROP TABLE "pages_blocks_benefits_items" CASCADE;
  DROP TABLE "pages_blocks_benefits" CASCADE;
  DROP TABLE "pages_blocks_split_intro" CASCADE;
  DROP TABLE "pages_blocks_icon_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_icon_cards" CASCADE;
  DROP TABLE "pages_blocks_icon_list_items" CASCADE;
  DROP TABLE "pages_blocks_icon_list" CASCADE;
  DROP TABLE "pages_blocks_divider" CASCADE;
  DROP TABLE "pages_blocks_case_study_list" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "case_studies_tags" CASCADE;
  DROP TABLE "case_studies_results" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "team_profiles" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_links" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_contact_items" CASCADE;
  DROP TABLE "footer_socials" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "site_settings_organization_same_as" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "design" CASCADE;
  DROP TABLE "case_study_page" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_visual_style";
  DROP TYPE "public"."enum_pages_blocks_statement_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_background";
  DROP TYPE "public"."enum_pages_blocks_approach_arrangement";
  DROP TYPE "public"."enum_pages_blocks_team_background";
  DROP TYPE "public"."enum_pages_blocks_split_intro_image_position";
  DROP TYPE "public"."enum_pages_blocks_icon_cards_background";
  DROP TYPE "public"."enum_pages_blocks_divider_nodes";
  DROP TYPE "public"."enum_pages_page_background";
  DROP TYPE "public"."enum_pages_seo_page_type";
  DROP TYPE "public"."enum_pages_seo_change_frequency";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_site_settings_organization_type";`)
}
