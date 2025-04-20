--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO neondb_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: neondb_owner
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Account" (
    "userId" uuid NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO neondb_owner;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Product" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    category text NOT NULL,
    images text[],
    brand text NOT NULL,
    description text NOT NULL,
    stock integer NOT NULL,
    price numeric(12,2) DEFAULT 0 NOT NULL,
    rating numeric(3,2) DEFAULT 0 NOT NULL,
    "numReviews" integer DEFAULT 0 NOT NULL,
    "isFeatured" boolean NOT NULL,
    banner text,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Product" OWNER TO neondb_owner;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Session" (
    "sessionToken" text NOT NULL,
    "userId" uuid NOT NULL,
    expires timestamp(6) without time zone NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text DEFAULT 'NO_NAME'::text NOT NULL,
    email text NOT NULL,
    "emailVerified" timestamp(6) without time zone,
    image text,
    password text,
    role text DEFAULT 'user'::text NOT NULL,
    address json,
    "paymentMethod" text,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO neondb_owner;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO neondb_owner;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Product" (id, name, slug, category, images, brand, description, stock, price, rating, "numReviews", "isFeatured", banner, "createdAt") FROM stdin;
cd0ac14c-69a6-43cc-8cb2-91a94cc29af6	Avian LCD Backpack	avian-lcd-backpack	Components	{/images/product-images/lcd-backpack/lcd-backpack-01.png,/images/product-images/lcd-backpack/lcd-backpack-01.png}	Avian	This module is an i2c / SPI character LCD backpack with compact design that doesn't cause the mounting obstruction that ordinary boards do. Its basic function is to reduce the number of pins needed to connect to an LCD. It utilizes a general purpose I/O expansion chip, the MCP23008 which has 8 i/o pins (7 are connected) with optional pull-ups, along with a shift register 74HC595 that is used for SPI that has 7 connected outputs.	6	9.99	4.70	18	t	\N	2025-04-14 12:00:08.058
d5e5308c-babf-4455-98e0-38af01f5d62f	Avian Breadboard Multi-Tool	avian-breadboard-multi-tool	Components	{/images/product-iomages/multi-tool/breadboard-multi-tool-01.png,/images/product-iomages/multi-tool/breadboard-multi-tool-02.png}	Avian	This breadboard comes with the standard power outputs and much more for your prototyping needs. All you'll ever need in one easy to use device that includes a volt meter, continuity tester, and variable supply output.	10	14.88	4.20	8	t	\N	2025-04-14 12:00:08.058
547f9b4d-c72c-41be-991d-82ad1e613301	Avian Signal Gator	avian-signal-gator	Devices	{/images/product-images/signal-gator.jpg}	Avian	The Signal Gator is a multi purposed and wide applicable device that provides a varialbe gating function for signals. The Signal Gators initial purpose was and still is to integrate into amatuer and professional plasma wave healing technology also commonly known as Rife technology. These units were designed to provide a gating function between the frequncy generator and the transmitter at a variable rate of 0.5 Hz - 20 Hz. The unit can handle 250V 16 A AC or DC signals and is powered by a 12V DC barrel jack.     Includes:  1 x Signal Gator  1 x 1M cord BNC to 3.5MM Stereo Jack   1 x 12V AC to DC Wall Adapter	0	140.00	4.90	3	f	\N	2025-04-14 12:00:08.058
92e227e3-8aad-4a74-aaa1-8561b6aaf8a4	Avian Protoshield	avian-protoshield	Componenets	{/images/product-images/uno-protoshield/uno-protoshield-02.png,/images/product-images/uno-protoshield/uno-protoshield-03.png,/images/product-images/uno-protoshield/uno-protoshield-04.png}	Avian	This prototyping shield does not hold back when it comes to giving you access to prototyping integrated chips! It comes with a number of surface mount breakouts and pin mount breakouts to give you the options to do more! Alot more!   The surface mount breakouts: SOIC-14(SOIC-8),MSOP-8,MSOP-10,TQFP-32, TSSOP-16  Pin Mounts Include 2.54 mm spacing dual in-line package (DIP) from 4-20 pin packages	8	8.88	4.60	12	t	\N	2025-04-14 12:00:08.058
7ac606a5-6428-43b6-a1e9-a918149c1977	Transparent 830 Tie Solderless Breadboard	transparent-830-tie-solderless-breadboard	Components	{/images/product-images/bread-board/bread-board-01.avif,/images/product-images/bread-board/bread-board-02.avif}	Avian	Classic Polo style with moThis is a Standard Universal Clear Solderless Breadboard it has 830 Tie points.  Features 2 split power buses 10 columns and 63 rows.  Perfect for straddling DIP packages   Board accepts wires between 20-29AWG  The board comes with a self-adhesive back and interlocking parts so you can join multiples together.  Dimensions: 6.5 x 2.1 x 0.38" (165.1 x 54.29 x 9.68mm)dern comfort	5	4.88	4.50	10	f	\N	2025-04-14 12:00:08.058
1d563a67-3d53-4c35-b5a2-1214a4597992	Arduino Starter Kit - UNO Scout	avian-arduino-starter-kit	Arduino Kits	{/images/product-images/arduino-kit-01/arduino-kit-01.jpg,/images/product-images/arduino-kit-01/arduino-kit-01.png,/images/product-images/arduino-kit-01/arduino-kit-02.png,/images/product-images/arduino-kit-01/arduino-kit-03.png,/images/product-images/arduino-kit-01/arduino-kit-04.png,/images/product-images/arduino-kit-01/arduino-kit-05.png,/images/product-images/arduino-kit-01/arduino-kit-07.png,/images/product-images/arduino-kit-01/arduino-kit-08.png,/images/product-images/arduino-kit-01/arduino-kit-09.png,/images/product-images/arduino-kit-01/arduino-kit-10.png}	Avian	Our Arduino starter kit is one of the best options out there to get you started in electronics hardware and software. It aims to match you with stepped learning materials similar to a college curriculum to ensure you have what you need to learn and understand the fundamentals before proceeding into system implementation with the UNO Scout Microcontroller. You can start with the basics using the number of integrated chip circuits that are provided so you can assemble and learn about digital logic and design. During which and moving forward you will be able to take advantage of our Breadboard Power Supply Multi-Tool that features a voltmeter & continuity checker along with its selectable 3.3V, 5V and adjustable power supply outputs. You can then move forward on the very functional and cross platform compatible UNO Scout Microcontroller that features the quick connect I2C environment accessed on the 4-pin JST-SH 1.00MM connector.     The Arduino Starter Kit starts you off with a platform that truly provides you with options for prototyping and testing with the materials needed to have a stepped learning experience reflecting a college curriculum approach for a competitive price. But that's not to say we cut corners! On the contrary we strive to eliminate inefficiencies by filling voids and giving you more for your money, as you will notice we do not hold back on the functionality of our modules and usage of our board space to give you the most options all while wrapping it together with an aesthetic appeal, because ultimately what you build matters and why you build it even more! So unlock your true potential and ascend with Avian while supporting Americans First today! ​  Features  100% compatible with Arduino software, sensors and codes.  Provides an efficient sequential way to learn electronics and programming with Arduino.  The modules are pre-soldered, so they are easy to wire up.  Made in USA Technical Details  Parts List  UNO Scout Controller Board x 1  UNO Protoshield x 1  Breadboard Power Supply Multi-Tool x 1  Low Power 1 CH Relay x 1  LCD Backpack x 1  LCD1602 Module ( with pin header) x 1  Joystick Module x 1  IR Receiver x 1  Servo Motor (SG90) x 1  Stepper Motor x 1  ULN2003 Stepper Motor Driver Board x 1  DC Motor with Fan x 1  Ultrasonic Range Sensor x 1  DHT11 Temperature and Humidity Module x 1  65 Jumper Wire x 1  140 Preformed Breadboard Wire kit x 1  USB Cable x 1  M-M 10mm JST-SH 1.0mm Crossover Cable x 1  Active Buzzer x 1  Passive Buzzer x 1  Rotary Encoder x 1  Breadboard 830 Tie Points x 1  Infrared slim Remote with receiver module x 1  Infrared Laser and Receiver Module x 1  Tactile button switch (small) x 5  1 digit 7-segment Display x 1  4 digit 7-segment Display x 1  White LED x 5  Yellow LED x 5  Blue LED x 5  Green LED x 5  Red LED x 5  Photoresistor x 2  NPN Transistor (PN2222) x 2  Resistor (100,330) x 10 ea + (1K 10K,100K,1M) x 5 ea = 40   Potentiometer x 1  Capacitor 0.1 uF x 1  Capacitor 10 uF x 1  Female-to-male Dupont Wire x 10  IC 8-bit Shift Register 74HC595 x 1  IC Dual Pos-Edge-Trig J-K Flip-Flop 74HC112N x 2  IC Single Precision Timer NE555P x 1  IC Quad NAND Gate 74AHCT00N x 2  IC 7 Segment Decoder SN74LS90N x 1  IC Dual Operational Amplifier LM358P x 1  IC Quad Half-H Drivers L293D x 1	10	48.99	4.90	5	f	\N	2025-04-14 12:00:08.058
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, name, email, "emailVerified", image, password, role, address, "paymentMethod", "createdAt", "updatedAt") FROM stdin;
ab3f2bb5-7889-451d-8ecb-6eac4e93891b	John	admin@example.com	\N	\N	$2a$10$5JOQ0lF9PxP.7h9.uaFQxObplYijFX7T2WQcQ/JN1/Y.VrhO6KRiW	admin	\N	\N	2025-04-14 12:00:08.314	2025-04-14 12:00:08.314
9e0bbd08-bd42-4941-9aa7-16d091ea87bf	user	user@example.com	\N	\N	$2a$10$ilbz1i5M7bGHixqHXQdYIemGVPXCbQPvFCFacbHIHvagVOJEgAxM6	user	\N	\N	2025-04-14 12:00:08.314	2025-04-14 12:00:08.314
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c27fc13e-970d-4ace-8c15-8ba485eb9130	4793481c14a80cd47a4dcdf89d4a2e749aea0d0121deed2bafc7f3fdb5caf622	2025-04-06 05:21:47.217017+00	20250406052146_init	\N	\N	2025-04-06 05:21:46.837902+00	1
aeffd9fd-c110-43cf-8c58-d36f5b6a13d1	7f4b277b6e060930a908fea7ab80b55e06c1a8a07cf90b6c24688a54b59b8ad8	2025-04-14 06:58:05.320649+00	20250414065801_add_user_base_tables	\N	\N	2025-04-14 06:58:04.957301+00	1
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: product_slug_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX product_slug_idx ON public."Product" USING btree (slug);


--
-- Name: user_email_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX user_email_idx ON public."User" USING btree (email);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: neondb_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

