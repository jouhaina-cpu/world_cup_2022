import {MatchEntity} from './match'

export interface TournoisEntity{
    tournoi_title: string;
    status: string;
    tournois_matchs: MatchEntity[];
}