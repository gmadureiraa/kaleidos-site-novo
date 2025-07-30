"use client";

import { useAnalytics } from "./analytics";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Componente para tracking automático de páginas
export function PageTracking() {
  const { trackPageView } = useAnalytics();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname, trackPageView]);

  return null;
}

// Hook para tracking de interações com cases
export function useCaseTracking() {
  const { trackEvent } = useAnalytics();

  const trackCaseView = (caseName: string) => {
    trackEvent('case_view', {
      case_name: caseName,
      event_category: 'engagement',
      event_label: 'case_view'
    });
  };

  const trackCaseVideoPlay = (caseName: string, videoName: string) => {
    trackEvent('case_video_play', {
      case_name: caseName,
      video_name: videoName,
      event_category: 'engagement',
      event_label: 'video_play'
    });
  };

  const trackCaseContact = (caseName: string) => {
    trackEvent('case_contact', {
      case_name: caseName,
      event_category: 'conversion',
      event_label: 'contact_form'
    });
  };

  return {
    trackCaseView,
    trackCaseVideoPlay,
    trackCaseContact,
  };
}

// Hook para tracking de serviços
export function useServiceTracking() {
  const { trackEvent } = useAnalytics();

  const trackServiceView = (serviceName: string) => {
    trackEvent('service_view', {
      service_name: serviceName,
      event_category: 'engagement',
      event_label: 'service_view'
    });
  };

  const trackServiceContact = (serviceName: string) => {
    trackEvent('service_contact', {
      service_name: serviceName,
      event_category: 'conversion',
      event_label: 'service_contact'
    });
  };

  return {
    trackServiceView,
    trackServiceContact,
  };
}

// Hook para tracking de navegação
export function useNavigationTracking() {
  const { trackEvent } = useAnalytics();

  const trackMenuClick = (menuItem: string) => {
    trackEvent('menu_click', {
      menu_item: menuItem,
      event_category: 'navigation',
      event_label: 'menu_click'
    });
  };

  const trackCTAClick = (ctaType: string, location: string) => {
    trackEvent('cta_click', {
      cta_type: ctaType,
      location: location,
      event_category: 'conversion',
      event_label: 'cta_click'
    });
  };

  return {
    trackMenuClick,
    trackCTAClick,
  };
}

// Hook para tracking de performance
export function usePerformanceTracking() {
  const { trackEvent } = useAnalytics();

  const trackPageLoadTime = (loadTime: number) => {
    trackEvent('page_load_time', {
      load_time: loadTime,
      event_category: 'performance',
      event_label: 'page_load'
    });
  };

  const trackVideoLoadTime = (videoName: string, loadTime: number) => {
    trackEvent('video_load_time', {
      video_name: videoName,
      load_time: loadTime,
      event_category: 'performance',
      event_label: 'video_load'
    });
  };

  return {
    trackPageLoadTime,
    trackVideoLoadTime,
  };
} 