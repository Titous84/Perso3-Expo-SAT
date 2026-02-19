import { Container, Divider, Stack } from "@mui/material";
import AdministrationNavigationSidebar from "../../components/AdministrationMainPage/AdministrationNavigationSidebar";
import { ADMINISTRATION_MAIN_PAGE_TABS } from "../../types/AdministrationMainPage/AdministrationMainPageTabs";
import IPage from "../../types/IPage";
import React from "react";

interface AdministrationMainPageState {
    componentToDisplayInContentZone: React.ComponentType<any>;
    selectedTabId: string;
}

/**
 * Page d'administration.
 * @author Nathan Reyes
 */
export default class AdministrationMainPage extends IPage<{}, AdministrationMainPageState> {
    constructor(props: {}) {
        super(props)

        const tabIdFromUrl = new URLSearchParams(window.location.search).get("onglet") ?? ADMINISTRATION_MAIN_PAGE_TABS[0].id;
        const selectedTab = ADMINISTRATION_MAIN_PAGE_TABS.find(tab => tab.id === tabIdFromUrl) ?? ADMINISTRATION_MAIN_PAGE_TABS[0];

        this.state = {
            componentToDisplayInContentZone: selectedTab.componentToDisplayInContentZone,
            selectedTabId: selectedTab.id
        }
    }

    render() {
        return (
            <div data-testid="AdministrationMainPage">
                <Stack direction="row">
                    <AdministrationNavigationSidebar
                        selectedTabId={this.state.selectedTabId}
                        onAdministrationSidebarTabSelected={this.onSidebarTabSelected}
                    />

                    <Divider orientation="vertical" flexItem />

                    <Container>
                        {React.createElement(this.state.componentToDisplayInContentZone)}
                    </Container>
                </Stack>
            </div>
        )
    }

    onSidebarTabSelected = (newTabId: string) => {
        const selectedTab = ADMINISTRATION_MAIN_PAGE_TABS.find(tab => tab.id === newTabId);
        if (!selectedTab) return;

        // @author Nathan Reyes - Synchroniser l'onglet actif dans l'URL pour la navigation retour/avant.
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("onglet", newTabId);
        window.history.pushState({}, "", currentUrl.toString());

        this.setState({
            componentToDisplayInContentZone: selectedTab.componentToDisplayInContentZone,
            selectedTabId: selectedTab.id
        });
    };
}
