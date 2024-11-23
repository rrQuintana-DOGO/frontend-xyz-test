import * as React from "react";
import PageContainer from "@containers/PageContainer";
import Tabs from "./components/Tabs";
import { SearchBar } from "./components/SearchBarAlert";
import { AlertsList } from "./components/AlertsList";
import { AlertDetails } from "./components/AlertDetails";
import { Alert, AlertType, Tab } from "./components/Types";
import useGetAllAlerts from "@logic/hooks/alerts/useGetAllAlerts";

export default function Alerts() {
    const [selectedAlert, setSelectedAlert] = React.useState<Alert | null>(null);
    const [activeTab, setActiveTab] = React.useState<AlertType>("trip");
    const { data: alerts = [] } = useGetAllAlerts({ page: 1, limit: 10});

    console.log(alerts);

    const filteredAlerts = React.useMemo(() => {
        return (alerts || []).filter(alert => alert.type === activeTab);
    }, [alerts, activeTab]);
    
    const tabs: Tab[] = React.useMemo(() => {
        const grouped = (alerts || []).reduce((acc, alert) => {
            acc[alert.type] = (acc[alert.type] || 0) + 1;
            return acc;
        }, {} as Record<AlertType, number>);
    
        return [
            { label: "Alertas por viaje", count: grouped["trip"] || 0, type: "trip" },
            { label: "Alertas por evento", count: grouped["event"] || 0, type: "event" },
            { label: "Alertas atendidas", count: grouped["attended"] || 0, type: "attended" },
        ];
    }, [alerts]);
    
    const handleTabSelect = (index: number) => {
        setActiveTab(tabs[index].type);
    };

    return (
        <PageContainer
            title="Alertas"
            mainRoute={{ label: 'Inicio', href: '/inicio' }}
            secondaryRoute="Alertas"
        >
            <div className="w-1/3">
                <Tabs 
                    tabs={tabs} 
                    selectedTab={tabs.findIndex(tab => tab.type === activeTab)}
                    onTabSelect={handleTabSelect} 
                />
            </div>
            <div className="bg-white">
                <div className="flex h-full">
                    <div className="w-1/3 border-r p-4">
                        <SearchBar />
                    </div>
                </div>
                <div className="flex h-full w-full">
                    <div className="w-1/3 border-r p-1">
                        <AlertsList
                            alerts={filteredAlerts}
                            onSelectAlert={setSelectedAlert}
                            selectedAlert={selectedAlert}
                        />
                    </div>
                    <div className="w-2/3 p-1">
                        <AlertDetails alert={selectedAlert}/>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}