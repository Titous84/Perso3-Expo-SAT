/**
 * Membre d'équipe.
 * Mathieu Sévégny
 */
export default interface TeamMember{
    /**
     * Prénom du membre (max 40 char.)
     */
    firstName:string;
    /**
     * Nom de famille du membre (max 40 char.)
     */
    lastName:string;
    /**
     * Numéro de DA du membre (max 255 char.)
     */
    numero_da:string;
    /**
     * Consentement d'être pris en photo
     */
    pictureConsent:number;
    /**
     * Clause de consentement photo: 0=refus,1=interne,2=publication.
     * @author Nathan Reyes
     */
    pictureConsentScope:number;
    /**
     * Masquer les renseignements personnels du participant dans les affichages administratifs.
     * @author Nathan Reyes
     */
    isAnonymous:boolean;
}