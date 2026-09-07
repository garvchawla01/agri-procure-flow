# Kisan Setu Connect

Create a complete, modern, responsive web application called “KISANSETU” for a Smart Farmer Procurement Management System.

PROJECT PROBLEM:

Farmers often face:

1. Long waiting times at procurement centres.

2. Lack of information about procurement schedules.

3. Uncertainty about their procurement status.

GOAL:

KISANSETU should allow farmers to submit procurement requests, receive a unique token, get an assigned time slot, track their live procurement status, and receive notifications. Procurement officers should be able to manage farmers, verify documents, record weighing details, and update procurement status.

BRAND IDENTITY:

Use the uploaded KISANSETU logo as the primary branding reference.

The website should visually match the logo:

- Traditional Indian agriculture

- Trustworthy

- Clean

- Professional

- Modern technology combined with an earthy agricultural identity

COLOUR PALETTE:

Primary Earth Brown: #5A3218

Agriculture Green: #4F7D32

Warm Cream Background: #F8F1E3

Card White: #FFFDF7

Wheat Gold: #D9A441

Dark Text: #2F2118

Success Green: #4F8A3A

Warning Amber: #D99A24

Pending Grey: #8A8A82

Use approximately:

50% cream/white

25% brown

15% green

10% gold

Do NOT use a bright neon-green or overly colourful design.

TECHNOLOGY:

Use:

- React.js

- Tailwind CSS

- Node.js + Express

- Firebase or MongoDB for database

- Firebase Authentication/OTP for login

- QR/Barcode generation for tokens

- Responsive design for mobile, tablet and desktop

If a backend cannot be implemented, create a fully functional frontend prototype using realistic mock data and local state/localStorage.

==================================================

WEBSITE STRUCTURE

==================================================

1. LANDING / HOME PAGE

Create a professional homepage with:

Navbar:

- KISANSETU logo

- Home

- How It Works

- Procurement Centres

- About

- Contact

- Farmer Login

- Officer Login

Hero section:

Heading:

“Smart Procurement. Less Waiting. More Transparency.”

Subheading:

“KISANSETU connects farmers with procurement centres through digital scheduling, token-based tracking and real-time status updates.”

Buttons:

“Start Procurement Request”

“Track My Procurement”

Add an agricultural/farmer visual on the right.

Problem section:

Show three cards:

- Long Waiting Times

- No Schedule Information

- Uncertain Procurement Status

Solution section:

Explain:

- Digital Token

- Smart Slot Allocation

- Live Status Tracking

- Transparent Procurement

How It Works:

Show a simple 6-step flow:

1. Request

2. Token Generated

3. Slot Assigned

4. Reach Centre

5. Weighing

6. Verification & Payment

Add a final “Procurement Completed” state.

Benefits:

- Reduced waiting time

- Better planning

- Real-time updates

- Transparency

- Fair and organized procurement

- Improved officer efficiency

CTA:

“Ready to simplify procurement?”

Button: “Get Started”

==================================================

2. FARMER LOGIN

==================================================

Create a simple farmer login page.

Fields:

- Mobile Number

- OTP

Alternative demo button:

“Continue as Demo Farmer”

Use a clean white card on cream background.

==================================================

3. FARMER DASHBOARD

==================================================

Create a professional dashboard.

Header:

“Kisan Dashboard”

Show farmer profile:

- Farmer Name

- Farmer ID

- Village

- Registered Mobile

Statistics cards:

- Active Requests

- Upcoming Slot

- Completed Procurements

- Pending Actions

Main buttons:

“New Procurement Request”

“Track Status”

“View Schedule”

“Notifications”

Recent procurement table:

Token | Crop | Quantity | Centre | Slot | Status

Example:

A104 | Wheat | 250 kg | XYZ Centre | 10:00 AM | In Progress

==================================================

4. NEW PROCUREMENT REQUEST

==================================================

Create a form:

Farmer Name

Farmer ID

Crop Type

Expected Quantity

Procurement Centre

Preferred Date

Contact Number

Button:

“Submit Request”

After submission:

Show:

“Request Submitted Successfully”

Then automatically generate a unique token such as:

A104

==================================================

5. TOKEN & SLOT PAGE

==================================================

Create an attractive token card.

Example:

YOUR PROCUREMENT TOKEN

A104

Procurement Centre:

XYZ Procurement Centre

Date:

12 September 2026

Time Slot:

10:00 AM – 11:00 AM

Status:

Slot Confirmed

Add:

- QR Code

- Download/Print Token button

- Add reminder button

Message:

“Please arrive during your assigned slot to avoid waiting.”

==================================================

6. LIVE PROCUREMENT STATUS

==================================================

This is one of the most important pages.

Title:

“Track Your Procurement”

Input:

Enter Token Number

Example:

A104

Show a horizontal/vertical timeline:

✓ Request Submitted

✓ Token Generated

✓ Slot Assigned

● Reached Centre

○ Weighing

○ Verification

○ Procurement Completed

Use:

Green = Completed

Gold = In Progress

Grey = Pending

Show:

Current Status:

“Reached Centre”

Estimated waiting/processing information where appropriate.

Also show:

Centre Name

Token Number

Assigned Slot

Last Updated

Add:

“Refresh Status”

==================================================

7. PROCUREMENT SCHEDULE

==================================================

Create a schedule page.

Filters:

- Date

- Crop

- Procurement Centre

Display available slots:

10:00 AM – 11:00 AM

11:00 AM – 12:00 PM

12:00 PM – 1:00 PM

Each slot should show:

Available / Almost Full / Full

Allow farmer to select an available slot.

==================================================

8. NOTIFICATIONS

==================================================

Create a notification centre.

Examples:

“Your token A104 has been generated.”

“Your procurement slot is confirmed for 10:00 AM.”

“Your token has been scanned at the procurement centre.”

“Weighing has been completed.”

“Verification is completed.”

“Procurement completed. Payment initiated.”

Use notification icons and timestamps.

==================================================

9. PROCUREMENT OFFICER LOGIN

==================================================

Separate officer login.

Fields:

- Officer ID

- Password

Demo login option.

==================================================

10. OFFICER DASHBOARD

==================================================

Create an officer dashboard.

Sidebar:

Dashboard

Today's Schedule

Farmer Requests

Token Scanner

Weighing

Verification

Completed

Notifications

Settings

Statistics:

Today's Farmers

Pending Requests

In Progress

Completed

Total Quantity Procured

Today's queue table:

Token | Farmer | Crop | Quantity | Slot | Status | Action

Actions:

View

Scan

Update Status

==================================================

11. TOKEN / QR SCANNER

==================================================

Create a scanner interface.

Allow:

“Scan QR Code”

After scanning token A104, display:

Farmer:

Rahul Kumar

Crop:

Wheat

Quantity:

250 kg

Slot:

10:00 AM

Status:

Reached Centre

Buttons:

“Start Weighing”

“Update Status”

==================================================

12. WEIGHING PAGE

==================================================

Show farmer details.

Fields:

Token Number

Crop

Expected Quantity

Actual Weight

Example:

Expected: 250 kg

Actual: 243 kg

Button:

“Save Weight”

After saving:

Status becomes:

“Weighing Completed”

==================================================

13. VERIFICATION PAGE

==================================================

Create verification checklist:

✓ Farmer Identity

✓ Land/Farmer Documents

✓ Crop Details

✓ Token

✓ Weight Details

Officer can mark each item as verified.

Button:

“Complete Verification”

Then update status to:

“Verification Completed”

==================================================

14. PROCUREMENT COMPLETED PAGE

==================================================

Show a success screen:

“Procurement Completed Successfully”

Details:

Token

Farmer

Crop

Final Weight

Procurement Centre

Date

Payment Status

Payment:

“Payment Initiated”

Use a green success icon.

==================================================

15. ADMIN DASHBOARD

==================================================

Create an admin panel.

Sidebar:

Overview

Farmers

Officers

Procurement Centres

Requests

Schedules

Reports

Notifications

Settings

Statistics:

Total Farmers

Today's Requests

Total Procurement

Pending Requests

Completed Requests

Add charts:

- Daily procurement

- Centre-wise procurement

- Crop-wise quantity

- Completed vs pending requests

==================================================

16. PROCUREMENT CENTRES

==================================================

Create a page showing procurement centres.

Each centre card should contain:

Centre Name

Location

Today's Capacity

Available Slots

Current Queue

Status

Example:

XYZ Procurement Centre

Delhi

Capacity: 200 Farmers

Current Queue: 24

Available Slots: 8

Status: Open

==================================================

17. DATABASE / SYSTEM LOGIC

==================================================

Create a central database structure.

Farmer:

id

name

mobile

village

farmerId

Request:

requestId

farmerId

crop

quantity

centre

date

token

slot

status

createdAt

updatedAt

Status values:

REQUESTED

TOKEN_GENERATED

SLOT_ASSIGNED

REACHED_CENTRE

WEIGHING

VERIFICATION

COMPLETED

PAYMENT_INITIATED

Every status update should update the farmer's dashboard in real time.

==================================================

18. NOTIFICATION SYSTEM

==================================================

When important events happen, generate notifications.

Examples:

Request submitted

Token generated

Slot assigned

Slot reminder

Centre reached

Weighing completed

Verification completed

Procurement completed

Payment initiated

Use mock SMS/push notification functionality if actual SMS services are not available.

==================================================

19. UI / UX REQUIREMENTS

==================================================

Design should be:

- Clean

- Professional

- Minimal

- Mobile-first

- Easy for farmers with limited technical experience

- Large buttons

- Clear icons

- Simple Hindi/English-friendly wording

- High readability

- Rounded cards

- Soft shadows

- Subtle animations

- Consistent spacing

Use the KISANSETU brown/green/cream/gold colour palette throughout.

Avoid:

- Neon colours

- Excessive gradients

- Overly complicated animations

- Cluttered dashboards

- Tiny text

Use icons related to:

- Farmer

- Crop

- Calendar

- Token

- QR

- Procurement centre

- Weighing

- Verification

- Notifications

==================================================

20. RESPONSIVE DESIGN

==================================================

The website must work properly on:

Mobile phones

Tablets

Laptops

Desktop screens

On mobile:

- Convert sidebar into hamburger menu

- Stack cards vertically

- Make tables horizontally scrollable

- Keep important actions easily accessible

==================================================

21. DEMO DATA

==================================================

Create realistic demo data so the website looks functional.

Demo farmer:

Name: Rajesh Kumar

Farmer ID: KSN1024

Village: Rampur

Mobile: 98XXXXXX21

Demo procurement:

Token: A104

Crop: Wheat

Quantity: 250 kg

Centre: XYZ Procurement Centre

Date: 12 September 2026

Slot: 10:00 AM – 11:00 AM

Status:

Reached Centre

Create multiple demo farmers and procurement requests for dashboards and charts.

==================================================

22. IMPORTANT DEMO FEATURE

==================================================

Create a “Demo Mode” where the evaluator can simulate the procurement process.

Add button:

“Simulate Next Step”

Clicking it changes:

Request Submitted

→ Token Generated

→ Slot Assigned

→ Reached Centre

→ Weighing

→ Verification

→ Completed

Update the farmer dashboard and officer dashboard simultaneously.

This feature is important for demonstrating the complete SIH solution.

==================================================

23. FINAL DESIGN

==================================================

The final website should feel like a real government/agriculture technology platform rather than a generic student project.

Brand:

KISANSETU

Tagline:

“Connecting Farmers to Fair & Transparent Procurement”

Primary visual identity:

Earth Brown + Agriculture Green + Warm Cream + Wheat Gold

Make the UI polished enough for an SIH presentation/demo.

Ensure all navigation buttons work, forms work, token generation works, status tracking works, and demo data is connected throughout the frontend.

Build the complete application, not just a landing page.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/57b11326-a60a-41a3-85c1-beaf0f7adc9b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
