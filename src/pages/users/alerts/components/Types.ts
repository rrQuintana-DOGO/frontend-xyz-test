export interface Tab {
  label: string;
  count?: number;
  type: AlertType;
}

export interface TabsProps {
  tabs: Tab[];
  selectedTab: number;
  onTabSelect: (index: number) => void;
}

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

export type AlertType = "trip" | "event" | "attended";

export interface Alert {
  id_notification: string;
  type: AlertType;
  active_alerts: number;
  trip: {
    id_trip: string;
    id_ext: string;
    description: string;
    route: {
      name: string;
    }
    client: {
      name: string;
    }
    drivers: Array<{
      name: string;
      phone: string;
      email: string;
    }>;
    carrier: {
      name: string;
    }
    places: Array<{
      id_place: string;
      name: string;
      real_arrive_date: string;
      real_estimate_departure_date: string;
    }>;
  }
  alert_time: string;
  unit: {
    name: string;
    plate: string;
  };
  alerts: Array<{
    id_notification: string;
    name: string;
  }>;
  trip_logs: Array<{
    user: {
      id: string;
      name: string;
    }
    status: {
      id_status: string;
      name: string;
    }
    comments: string;
    created_at: string;
  }>;
}