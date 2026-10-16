'use client';

import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <header>💼 لوحة التحكم</header>
      <nav>
        <ul>
          <li><a href="/dashboard/">الرئيسية</a></li>
          <li><a href="/dashboard/settings/">الإعدادات</a></li>
          <li><a href="/dashboard/signin/">تسجيل الدخول</a></li>
          <li><a href="/dashboard/templates/">القوالب</a></li>
          <li><a href="/dashboard/users/">المستخدمين</a></li>
        </ul>
      </nav> */}
      <main>{children}</main>
    </div>
  );
}
