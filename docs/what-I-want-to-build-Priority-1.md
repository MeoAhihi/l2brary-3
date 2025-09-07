## ✅ **Priority 1: Core MVP Functionality**

### 🟦 **IAM Domain**

1. **`/login`**

   **Explanation:** The primary entry point for all existing users (members and admins). It is fundamental for securing the system and providing access.

2. **`/register/{invite_token}`**

   **Explanation:** The landing page for new members who have been invited to the club. This flow is the only way to add new users, making it critical for club growth.

3. **`/admin/members`**

   **Explanation:** The main administrative view for listing all members. This is the admin's starting point for any user management task.

4. **`/admin/members/{user_id}`**

   **Explanation:** The read-only detail page for a single member. It allows an administrator to safely review a member's complete profile before deciding to take action, preventing accidental edits.

5. **`/admin/members/{user_id}/edit`**

   **Explanation:** The form where an administrator can modify a member's profile. This is essential for managing key data points that members cannot change themselves, such as their rank.

6. **`/profile`**

   **Explanation:** The personal landing page for a logged-in member to view their own information. This provides immediate value to the user by showing them their status and data within the club.

---

### 🟨 **L\&D Domain**

1. **`/admin/ld/courses/new`**

   **Explanation:** The starting point for all content in the L\&D domain. If an administrator cannot create a course, no other functionality can exist.

2. **`/courses`**

   **Explanation:** The primary discovery page for members. If members cannot see what courses are available, they cannot participate. This is the member-facing entry point to the system.

3. **`/courses/{course-id}`**

   **Explanation:** Provides the necessary information for a member to decide whether to enroll. Contains the crucial "Request to Enroll" button, which is the key call-to-action.

4. **`/admin/ld/courses/{course-id}/manage`** (Enrollments Tab)

   **Explanation:** This page completes the core loop. After a member requests enrollment, an administrator needs a place to view and approve that request.

---

### 🟥 **A\&E Domain**

1. **System Logging Engine** (Backend functionality)

   **Description:** Not a page, but the absolute highest priority. It enables logging of member activity data from other domains (e.g., session attendance).

   **Rationale:** This is the primary data source. Without it, there is no digital activity to track.

2. **`/admin/engagement/settings`** _(Partial: Manage Activity Types)_

   **Description:** Allows an admin to define the offline activities that Monitors can log (e.g., "Room Setup", "Presentation").

   **Rationale:** A required dependency for the manual logging form to function.

3. **`/log-activity`**

   **Description:** The page where Monitors manually log offline member contributions.

   **Rationale:** This ensures that non-system-tracked contributions are captured from day one.

4. **`/admin/members/{user_id}/engagement`**

   **Description:** A simple page for management to view a specific member’s activity log, likely just a chronological table at this phase.

   **Rationale:** This completes the feedback loop and allows verification that data logging is working correctly.

---

### 🟩 **Knowledge Sharing**

1. **`/knowledge/posts/new`**

   **Justification:** Fundamental starting point. Without the ability to create content, the Knowledge Hub cannot exist.

   **MVP Features:** A basic title field and rich-text editor for the body. Must allow saving in "Published" state.

2. **`/knowledge`**

   **Justification:** Central discovery page where members can browse published posts.

   **MVP Features:** A reverse-chronological list of post titles, each linking to a detailed view.

3. **`/knowledge/posts/{post_id}`**

   **Justification:** Delivers the actual value to readers by displaying post content.

   **MVP Features:** Displays the post's title and its formatted body content.

---

### 🟧 **Analytics**

1. **`/admin/analytics/growth`** _(Club Growth Dashboard)_

   **Why:** Gives club leaders a live view of membership trends. Essential for basic admin and reporting.

   **Use Cases:** #1 (Tracking Membership Growth), #3 (Understanding Demographics).

2. **`/admin/analytics/learning`** _(Basic L\&D Dashboard)_

   **Why:** Focuses on operational insights into course popularity and attendance.

   **Initial Features:** Enrollment and attendance stats.

   **Use Case:** #2 (Optimizing Course Planning).

3. **`/my-progress/performance`** _(My Performance Dashboard)_

   **Why:** Displays attendance and scores to each member. Encourages engagement.

   **Use Case:** #7 (Monitoring Skill Development).

## Routing

```text
/
├── login
├── register/{invite_token}
├── profile
├── courses
│   └── {course-id}
├── knowledge
│   ├── posts
│   │   ├── new
│   │   └── {post_id}
│   └── (index page)
├── log-activity
├── my-progress
|   └── performance
└── admin
    ├── members
    │   └── {user_id}
    │       ├── edit
    |       └── engagement
    ├── ld
    │   └── courses
    │       ├── new
    │       └── {course-id}
    │           └── manage
    ├── engagement
    |   └── settings
    └── analytics
        ├── growth
        └── learning

```

---

### ✅ Breakdown of Structure

- `admin/` branches:

  - `members/`: user management
  - `ld/courses/`: course creation and management
  - `engagement/settings`: A\&E activity type configuration
  - `analytics/`: dashboards for growth, learning

- `courses/`: member-facing course catalog and details
- `knowledge/`: content hub (create, read)
- `my-progress/`: member’s own performance dashboard

## Access Control

**Admin:**
- /admin/members
- /admin/members/{user_id}
- /admin/members/{user_id}/edit
- /admin/members/{user_id}/engagement
- /admin/ld/courses
- /admin/ld/courses/new
- /admin/ld/courses/{course-id}
- /admin/ld/courses/{course-id}/manage
- /admin/engagement/settings
- /admin/analytics/growth
- /admin/analytics/learning
- /courses
- /courses/{course-id}
- /knowledge
- /knowledge/posts
- /knowledge/posts/new
- /knowledge/posts/{post_id}
- /log-activity
- /my-progress
- /my-progress/performance
- /profile
- /login
- /register/{invite_token}

**Member:**
- /courses
- /courses/{course-id}
- /knowledge
- /knowledge/posts
- /knowledge/posts/new
- /knowledge/posts/{post_id}
- /my-progress
- /my-progress/performance
- /profile
- /login
- /register/{invite_token}

**Monitor:**
- /courses
- /courses/{course-id}
- /knowledge
- /knowledge/posts
- /knowledge/posts/{post_id}
- /log-activity
- /my-progress
- /my-progress/performance
- /profile
- /login
- /register/{invite_token}

**Guest:**
- /login
- /register/{invite_token}