import * as rankingService from "../services/ranking.service.js";

export async function getRanking(req, res, next) {
    try {
        const ranking = await rankingService.obtenerRankingGlobal();
        return res.status(200).json(ranking);
    } catch (err) {
        next(err);
    }
}
