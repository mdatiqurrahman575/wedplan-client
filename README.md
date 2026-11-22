# WedPlan — Role-Based Wedding Planning Platform (Frontend)

**WedPlan** is a modern, full-stack, role-based wedding planning platform that connects couples (Customers) with verified wedding service providers (Vendors) under complete administrative moderation (Admins).

## Live Demo Links
- **Frontend Live URL (Vercel):** https://wedplan-client-bay.vercel.app
- **Backend API URL (Vercel):** https://wedplan-server-nu-virid.vercel.app

---

## Demo Test Credentials
Use the following accounts to test role-based dashboards and permissions:

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | Ahmed | `haa@gmail.com` | `আপনার_পাসওয়ার্ড_দিন` |
| **Vendor** | Ah Hasan | `haaaa@gmail.com` | `আপনার_পাসওয়ার্ড_দিন` |
| **Customer** | Hasan | `haaa@gmail.com` | `আপনার_পাসওয়ার্ড_দিন` |

---

## Key Features & Business Rules

### 1. Authentication & Role Security
- Powered by **Better Auth** supporting Email/Password registration and **Google OAuth**.
- Password validation enforces a minimum of 6 characters with at least 1 uppercase and 1 lowercase letter.
- Public sign-up allows selecting only **Customer** or **Vendor** roles (Admin is assigned directly in MongoDB).
- Blocked users (`isBlocked: true`) are automatically restricted from accessing protected endpoints.

### 2. Public Pages & Discovery
- **Home Page:** Wedding-themed Hero Banner, 6 Service Categories, Featured Approved & Active Services, "Why Choose WedPlan?", and "How WedPlan Works" with **Framer Motion** animations.
- **Browse Services (`/services`):** Search by service name, filter by category and location, and sort by price (Ascending / Descending). Unauthenticated users are redirected to Sign In when clicking "View Details".

### 3. Booking System (`/services/[id]`)
- Protected route accessible only to authenticated users.
- Only **Customers** can place bookings; Vendors and Admins are restricted from booking services.
- **Duplicate Booking Prevention:** Prevents booking the same service on the same `eventDate` if an active booking already exists.

### 4. Role-Based Dashboards
- **Customer Dashboard:** Overview statistics, My Bookings (can cancel only `Pending` bookings), and Profile Settings (role and subscription are locked).
- **Vendor Dashboard:** Overview statistics, Add Service (defaults to `Pending`; **Free Plan limit: max 3 active services**), My Services (CRUD + active toggle), Booking Requests (Accept/Reject `Pending` requests), Subscription comparison & Stripe upgrade, and Profile Settings.
- **Admin Dashboard:** Platform overview metrics, Manage Users (search, filter by role, Block/Unblock), Manage Services (Approve/Reject/Delete), and Read-Only Stripe Transactions history.

### 5. Stripe Subscription & Webhook Security
- Vendors upgrade from **Free** to **Premium** via **Stripe Checkout (Test Mode)**.
- Account upgrade and transaction logging occur strictly after verifying the `checkout.session.completed` event on the backend **Stripe Webhook**.

---

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling & UI:** Tailwind CSS, ShadCN UI, Lucide Icons
- **Animations:** Framer Motion
- **Authentication:** Better Auth (Email/Password + Google OAuth)
- **Payments & Media:** Stripe Checkout, ImgBB API
- **Notifications:** React Hot Toast

---

## Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd wedplan-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=wedplanDB
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
   IMGBB_API_KEY=your_imgbb_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
