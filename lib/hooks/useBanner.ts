import { useEffect, useState, useCallback } from "react";
import { fetchJson, putJson } from "@/lib/api";
import { getStoredAuthUser } from "@/lib/auth";

const defaultBannerMessage =
  "Алхам бүртээ ахиц гаргаарай. Бага багаар тогтвортой хичээ.";

export function useBanner() {
  const [bannerMessage, setBannerMessage] = useState(defaultBannerMessage);
  const [bannerDraft, setBannerDraft] = useState(defaultBannerMessage);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [bannerSaving, setBannerSaving] = useState(false);
  const [bannerError, setBannerError] = useState<string | null>(null);

  const loadBanner = useCallback(async () => {
    let isMounted = true;
    setBannerLoading(true);
    setBannerError(null);

    try {
      const data = await fetchJson<{ message?: string | null }>("/banner");
      if (!isMounted) {
        return;
      }
      const message = data?.message?.trim() || defaultBannerMessage;
      setBannerMessage(message);
      setBannerDraft(message);
    } catch (err) {
      if (isMounted) {
        setBannerError(
          err instanceof Error ? err.message : "Алдаа гарлаа"
        );
      }
    } finally {
      if (isMounted) {
        setBannerLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const saveBanner = useCallback(async () => {
    const user = getStoredAuthUser();
    if (!user?.token) {
      setBannerError("Нэвтэрч орно уу.");
      return;
    }

    setBannerError(null);
    setBannerSaving(true);

    try {
      const data = await putJson<{ message?: string | null }>(
        "/banner",
        { message: bannerDraft },
        { token: user.token }
      );
      const message = data?.message?.trim() || bannerDraft.trim();
      setBannerMessage(message);
      setBannerDraft(message);
    } catch (err) {
      setBannerError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setBannerSaving(false);
    }
  }, [bannerDraft]);

  useEffect(() => {
    let isMounted = true;
    loadBanner();
    return () => {
      isMounted = false;
    };
  }, [loadBanner]);

  return {
    bannerMessage,
    bannerDraft,
    bannerLoading,
    bannerSaving,
    bannerError,
    setBannerDraft,
    saveBanner,
  };
}
