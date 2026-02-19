import { Box, Button, Stack, Typography } from "@mui/material";
import { TEXTS } from '../../lang/fr';
import AdministratorsTable from "../../components/AdministratorsListPage/AdministrationTable/AdministratorsTable";
import UserService from "../../api/users/userService";
import { useState } from "react";

/**
 * Page de gestion des administrateurs et paramètres généraux.
 * @author Antoine Ouellette
 */
export default function AdministratorsListPage() {
    const [isResetting, setIsResetting] = useState(false);

    const handleAnnualReset = async () => {
        setIsResetting(true);
        try {
            // @author Nathan Reyes - Permet de relancer une édition propre sans suppression des comptes admins.
            await UserService.resetAnnualData();
            alert("Les données annuelles ont été réinitialisées avec succès.");
        } catch (error: any) {
            alert(error?.message ?? "La réinitialisation annuelle a échoué.");
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div data-testid="administratorsListPage">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ mt:4, mb:2 }}>{TEXTS.administratorsListPage.title}</Typography>

                <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                    <Button variant="contained" color="warning" disabled={isResetting} onClick={handleAnnualReset}>
                        {isResetting ? "Réinitialisation..." : "Réinitialiser les données annuelles"}
                    </Button>
                </Stack>

                <AdministratorsTable />
            </Box>
        </div>
    )
}
