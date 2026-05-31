CREATE TABLE "exchanges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "exchanges_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "metrics_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"total_profit" numeric(20, 2) DEFAULT '0' NOT NULL,
	"total_trades" integer DEFAULT 0 NOT NULL,
	"total_opportunities" integer DEFAULT 0 NOT NULL,
	"win_rate" numeric(5, 2) DEFAULT '0' NOT NULL,
	"avg_latency_ms" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buy_exchange_id" uuid NOT NULL,
	"sell_exchange_id" uuid NOT NULL,
	"buy_price" numeric(20, 2) NOT NULL,
	"sell_price" numeric(20, 2) NOT NULL,
	"spread" numeric(20, 2) NOT NULL,
	"estimated_profit" numeric(20, 2) NOT NULL,
	"volume_btc" numeric(20, 8) NOT NULL,
	"score" numeric(10, 4) NOT NULL,
	"status" varchar(20) DEFAULT 'detected' NOT NULL,
	"detected_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "system_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"level" varchar(20) NOT NULL,
	"source" varchar(50) NOT NULL,
	"message" text NOT NULL,
	"payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trades" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_id" uuid NOT NULL,
	"buy_exchange_id" uuid NOT NULL,
	"sell_exchange_id" uuid NOT NULL,
	"volume_btc" numeric(20, 8) NOT NULL,
	"buy_price" numeric(20, 2) NOT NULL,
	"sell_price" numeric(20, 2) NOT NULL,
	"gross_profit" numeric(20, 2) NOT NULL,
	"trading_fees" numeric(20, 2) NOT NULL,
	"slippage_cost" numeric(20, 2) NOT NULL,
	"net_profit" numeric(20, 2) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"executed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallet_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_id" uuid NOT NULL,
	"trade_id" uuid,
	"asset" varchar(10) NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"transaction_type" varchar(20) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exchange_id" uuid NOT NULL,
	"btc_balance" numeric(20, 8) DEFAULT '0' NOT NULL,
	"usdt_balance" numeric(20, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_buy_exchange_id_exchanges_id_fk" FOREIGN KEY ("buy_exchange_id") REFERENCES "public"."exchanges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_sell_exchange_id_exchanges_id_fk" FOREIGN KEY ("sell_exchange_id") REFERENCES "public"."exchanges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_buy_exchange_id_exchanges_id_fk" FOREIGN KEY ("buy_exchange_id") REFERENCES "public"."exchanges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_sell_exchange_id_exchanges_id_fk" FOREIGN KEY ("sell_exchange_id") REFERENCES "public"."exchanges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_trade_id_trades_id_fk" FOREIGN KEY ("trade_id") REFERENCES "public"."trades"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_exchange_id_exchanges_id_fk" FOREIGN KEY ("exchange_id") REFERENCES "public"."exchanges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_exchanges_code" ON "exchanges" USING btree ("code");--> statement-breakpoint
CREATE INDEX "idx_metrics_snapshots_created_at" ON "metrics_snapshots" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_opportunities_buy_exchange_id" ON "opportunities" USING btree ("buy_exchange_id");--> statement-breakpoint
CREATE INDEX "idx_opportunities_sell_exchange_id" ON "opportunities" USING btree ("sell_exchange_id");--> statement-breakpoint
CREATE INDEX "idx_opportunities_status" ON "opportunities" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_opportunities_score" ON "opportunities" USING btree ("score");--> statement-breakpoint
CREATE INDEX "idx_opportunities_detected_at" ON "opportunities" USING btree ("detected_at");--> statement-breakpoint
CREATE INDEX "idx_system_events_level" ON "system_events" USING btree ("level");--> statement-breakpoint
CREATE INDEX "idx_system_events_source" ON "system_events" USING btree ("source");--> statement-breakpoint
CREATE INDEX "idx_system_events_created_at" ON "system_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_trades_opportunity_id" ON "trades" USING btree ("opportunity_id");--> statement-breakpoint
CREATE INDEX "idx_trades_status" ON "trades" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_trades_executed_at" ON "trades" USING btree ("executed_at");--> statement-breakpoint
CREATE INDEX "idx_wallet_transactions_wallet_id" ON "wallet_transactions" USING btree ("wallet_id");--> statement-breakpoint
CREATE INDEX "idx_wallet_transactions_trade_id" ON "wallet_transactions" USING btree ("trade_id");--> statement-breakpoint
CREATE INDEX "idx_wallet_transactions_created_at" ON "wallet_transactions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_wallets_exchange_id" ON "wallets" USING btree ("exchange_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_wallets_exchange_id" ON "wallets" USING btree ("exchange_id");