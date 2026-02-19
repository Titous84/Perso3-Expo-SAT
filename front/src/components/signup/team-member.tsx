/**
 * Tristan Lafontaine
 */
import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator'
import TeamMember from '../../types/sign-up/team-member';
import { MAX_LENGTH_FIRST_NAME, MAX_LENGTH_LAST_NAME } from '../../utils/constants';
import { Checkbox, FormControl,FormControlLabel,FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material';
import styles from "./../../pages/ParticipantRegistration/ParticipantRegistrationPage.module.css";
import { TextValidator } from 'react-material-ui-form-validator'
import { INPUT_VARIANT } from '../../utils/muiConstants';
import { TEXTS } from '../../lang/fr';
import { suffix } from '../../utils/utils';

/**
 *  Composant membre de l'équipe
 */
interface TeamMemberFormProps{
    teamMember:TeamMember;
    number:number;
    handleChangeTeamMember:(number:number,key:string,value:any) => void;
}

export default class TeamMemberForm extends React.Component<TeamMemberFormProps> {
    /**
     * Vérification personnaliser
     */
     componentDidMount() {

        //  Vérfier la longeur du champs nom famille
        ValidatorForm.addValidationRule('maxLenghtLastName', (value) => {
        if (value.length > MAX_LENGTH_LAST_NAME) {
            return false;
        }
            return true;
        });
        //  Vérifier la longeur du champs prénom
        ValidatorForm.addValidationRule('maxLenghtFirstName', (value) => {
            if (value.length > MAX_LENGTH_FIRST_NAME) {
                return false;
            }
            return true;
        });
    }
        
    //Permet d'enlever l'erreur des champs quand il respecte les critères
    componentWillUnmount() {
        // Retir l'erreur pour le champs prénom
        ValidatorForm.removeValidationRule('maxLenghtFirstName');
        // Retir l'erreur pour le champs nom famille
        ValidatorForm.removeValidationRule('maxLenghtLastName');
    }

    render(){
        return (
            <Paper elevation={8} className={`${styles.paddingPaper} ${styles.paddingPaperTop} ${styles.member}`}>
            <Paper
                    className={`${styles.subhead} ${styles.stack}`}
                >
                    <h2>{this.props.number}<sup>{suffix(this.props.number)}</sup> membre</h2>
                </Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextValidator
                                required
                                variant={INPUT_VARIANT}
                                label={TEXTS.signup.firstName.label}
                                name={TEXTS.signup.firstName.label}
                                onChange={(event:any) => this.props.handleChangeTeamMember(this.props.number,"firstName",event.target.value)}
                                value={this.props.teamMember.firstName}
                                validators={['required', 'maxLenghtFirstName']}
                                errorMessages={[TEXTS.signup.firstName.error.required, TEXTS.signup.firstName.error.maximum]}
                                inputProps={{ maxLength: MAX_LENGTH_FIRST_NAME }}
                                fullWidth />
                            <p className={styles.alignRight}>{this.props.teamMember.firstName.length} / {MAX_LENGTH_FIRST_NAME}</p>
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <TextValidator
                                required
                                variant={INPUT_VARIANT}
                                label={TEXTS.signup.lastName.label}
                                name={TEXTS.signup.lastName.label}
                                onChange={(event:any) => this.props.handleChangeTeamMember(this.props.number,"lastName",event.target.value)}
                                value={this.props.teamMember.lastName}
                                validators={['required', 'maxLenghtLastName']}
                                errorMessages={[TEXTS.signup.lastName.error.required, TEXTS.signup.lastName.error.maximum]}
                                inputProps={{ maxLength: MAX_LENGTH_LAST_NAME }}
                                fullWidth />
                            <p className={styles.alignRight}>{this.props.teamMember.lastName.length} / {MAX_LENGTH_LAST_NAME}</p>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextValidator
                                required
                                variant={INPUT_VARIANT}
                                label="Numero DA"
                                onChange={(event:any) => this.props.handleChangeTeamMember(this.props.number, "numero_da",event.target.value)}
                                name="Numero DA"
                                value={this.props.teamMember.numero_da}
                                validators={['required']}
                                errorMessages={['Le numéro de DA est requis']}
                                inputProps={{ maxLength: 255 }}
                                fullWidth />
                            <p className={styles.alignRight}>{this.props.teamMember.numero_da.length} / 255</p>
                        </Grid>
                        <Grid item xs={12} md={12}>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">{TEXTS.signup.pictureConsent.label}</FormLabel>
                            <RadioGroup
                                name="controlled-radio-buttons-group"
                                value={this.props.teamMember.pictureConsent}
                                onChange={(event:any) => {

                                    this.props.handleChangeTeamMember(this.props.number,"pictureConsent", Number(event.target.value));
                                    this.props.handleChangeTeamMember(this.props.number,"pictureConsentScope", Number(event.target.value))
                                }}
                            >
                                <FormControlLabel value={2} control={<Radio />} label="Autorise la publication (site web, médias sociaux, affichage)" />
                                <FormControlLabel value={1} control={<Radio />} label="Autorise uniquement un usage interne (organisation / archives)" />
                                <FormControlLabel value={0} control={<Radio />} label="Refus total de prise et d'utilisation de photos" />
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {/* @author Nathan Reyes - Option d'inscription anonyme pour masquer les données sensibles. */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.teamMember.isAnonymous}
                                        onChange={(event: any) => this.props.handleChangeTeamMember(this.props.number, "isAnonymous", event.target.checked)}
                                    />
                                }
                                label="Inscription anonyme : masquer prénom, nom et DA dans les listes administratives"
                            />
                        </Grid>
                    </Grid>
                </Paper>
        );
    }
}