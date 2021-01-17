<?php
/**
 * Created by PhpStorm.
 * User: mohamedchehimi
 * Date: 15/01/21
 * Time: 12:47
 */

namespace App\Controller\Game;


use App\Entity\ActionMarketing;
use App\Entity\Equipe;
use App\Entity\Joueur;
use App\Repository\CampagneRepository;
use App\Service\SerializerManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GameController
 * @package App\Controller\Game
 * @Route("/api")
 */
class ApiGameController extends AbstractController
{
    /**
     * @Route("/getQuestion/{id}",name="get_question",options={"expose"=true})
     * @param ActionMarketing $actionMarketing
     * @param SerializerManager $serializerManager
     * @return JsonResponse
     */
    public function getActionMarketingSurvey(ActionMarketing $actionMarketing, SerializerManager $serializerManager)
    {
        $normalized = $serializerManager->normalize($actionMarketing, ['survey', 'ref']);
        return new JsonResponse($normalized, 200);
    }

    /**
     * @Route("/getPlayerProfile/{id}",name="get_player_profile",options={"expose"=true})
     * @param Joueur $joueur
     * @param SerializerManager $serializerManager
     * @return JsonResponse
     */
    public function getPlayerProfile(Joueur $joueur, SerializerManager $serializerManager)
    {
        $normalized = $serializerManager->normalize($joueur, ['profile', 'ref']);
        return new JsonResponse($normalized, 200);
    }
    /**
     * @Route("/getCampaignByTeam/{id}",name="get_campaign_by_team",options={"expose"=true})
     */
    public function getCampaignByTeam(Equipe $equipe, SerializerManager $serializerManager, CampagneRepository $repository)
    {
        $campagne = $repository->getCampaignByTeam($equipe);
        $normalized = $serializerManager->normalize($campagne, ['ref','campagne','gamemodel']);
        return new JsonResponse($normalized, 200);
    }
}