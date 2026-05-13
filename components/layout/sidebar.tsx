"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Video, CalendarDays, Settings,
  LogOut, ChevronRight, Star, Users2,
  GraduationCap, PenLine, History, FolderOpen, Users,
  ChevronsUpDown,
} from "lucide-react";
import { ConstellationIcon } from "@/components/icons/constellation-icon";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTranslation } from "@/lib/i18n/hooks";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname   = usePathname();
  const router     = useRouter();
  const { t }      = useTranslation();
  const [isExpert, setIsExpert] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkExpert = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "");
      const { data } = await supabase
        .from("experts")
        .select("id, expertise")
        .eq("user_id", user.id)
        .maybeSingle();
      setIsExpert(!!data);
      if (data?.expertise) setUserRole(data.expertise);

      // Try to get role from profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.full_name) setUserName(profile.full_name);
    };
    checkExpert();
  }, []);

  const mainNav = [
    { href: "/dashboard",               label: t("nav.dashboard"),     icon: LayoutDashboard },
    { href: "/dashboard/library",       label: "Toolkit",              icon: BookOpen },
    { href: "/dashboard/workspace",     label: "Workspace",            icon: FolderOpen },
    { href: "/dashboard/calendar",      label: "Calendar",             icon: CalendarDays },
    { href: "/dashboard/masterclasses", label: t("nav.masterclasses"), icon: Video },
    { href: "/dashboard/experts",       label: "Meet the Experts",     icon: Users },
    { href: "/dashboard/contacts",      label: t("nav.directory"),     icon: Users2 },
    { href: "/dashboard/signing",       label: "eSignature",           icon: PenLine },
    { href: "/dashboard/audit-trail",   label: t("nav.auditTrail"),    icon: History },
    { href: "/dashboard/learn",         label: t("nav.learn"),         icon: GraduationCap },
    ...(isExpert ? [{ href: "/dashboard/expert", label: t("nav.expertDashboard"), icon: Star }] : []),
  ];

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href + "/"));

  // Initials for avatar
  const initials = userName
    ? userName.split(" ").map((p: string) => p[0]).slice(0, 2).join("").toUpperCase()
    : "—";

  return (
    <aside
      className="fixed left-0 top-0 h-full hidden lg:flex flex-col z-40"
      style={{
        width: "232px",
        background: "var(--bg)",
        borderRight: "1px solid var(--line)",
      }}
      aria-label={t("nav.dashboard")}
    >
      {/* ── ROSTER wordmark ── */}
      <div className="px-5 py-5" style={{ borderBottom: "1px solid var(--line)" }}>
        <Link href="/" aria-label={`${APP_NAME} — ${t("nav.home")}`}>
          <div className="flex items-baseline gap-2">
            <span
              className="text-[16px] font-bold tracking-[0.16em] leading-none"
              style={{ color: "var(--accent)" }}
            >
              {APP_NAME}
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] leading-none text-mute">
              v 2.6
            </span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-mute mt-1.5">
            by JO:LA LABS
          </div>
        </Link>
      </div>

      {/* ── Primary nav ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label={t("nav.dashboard")}>
        <div className="space-y-px">
          {mainNav.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between gap-2 px-2 h-8 rounded text-[13px] transition-colors group",
                  active
                    ? "bg-surface-2 text-ink"
                    : "text-mute hover:text-ink hover:bg-surface-2/50"
                )}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{label}</span>
                </span>
                {active && (
                  <ChevronRight
                    size={11}
                    className="shrink-0 text-accent/70"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── ROSTER AI — visually separated ── */}
        <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--line)" }}>
          <Link
            href="/dashboard/assistant"
            aria-current={isActive("/dashboard/assistant") ? "page" : undefined}
            className={cn(
              "flex items-center justify-between gap-2 px-2 h-8 rounded text-[13px] transition-colors",
              isActive("/dashboard/assistant")
                ? "bg-accent/10 text-accent"
                : "text-mute hover:text-ink hover:bg-surface-2/50"
            )}
          >
            <span className="flex items-center gap-2.5">
              <ConstellationIcon size={14} aria-hidden="true" />
              {t("nav.assistant")}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mute/70">
              Beta
            </span>
          </Link>
        </div>
      </nav>

      {/* ── Bottom: settings + sign-out + user ── */}
      <div
        className="px-2 py-3 space-y-px"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-2.5 px-2 h-8 rounded text-[13px] transition-colors",
            isActive("/dashboard/settings")
              ? "bg-surface-2 text-ink"
              : "text-mute hover:text-ink hover:bg-surface-2/50"
          )}
        >
          <Settings size={14} aria-hidden="true" />
          {t("nav.settings")}
        </Link>

        <div className="flex items-center gap-1">
          <button
            onClick={handleSignOut}
            className="flex-1 flex items-center gap-2.5 px-2 h-8 rounded text-[13px] text-mute hover:text-error hover:bg-error/5 transition-colors"
          >
            <LogOut size={14} aria-hidden="true" />
            {t("nav.signOut")}
          </button>
          <ThemeToggle className="shrink-0" />
          <LanguageSwitcher className="shrink-0" />
        </div>

        {/* ── User identity strip ── */}
        <div
          className="flex items-center gap-2.5 px-2 pt-3 mt-1"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          {/* Avatar */}
          <div
            className="w-7 h-7 rounded shrink-0 flex items-center justify-center font-mono text-[10px] leading-none"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
              color: "var(--ink)",
            }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-ink leading-tight truncate">
              {userName || "—"}
            </div>
            {userRole && (
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-mute truncate">
                {userRole}
              </div>
            )}
          </div>
          {/* Online dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
