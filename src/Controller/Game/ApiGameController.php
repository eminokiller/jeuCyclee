<?php
/**
 * Created by PhpStorm.
 * User: ubuntu
 * Date: 15/01/21
 * Time: 12:47
 */

namespace App\Controller\Game;


use App\Entity\ActionMarketing;
use App\Entity\Campagne;
use App\Entity\Equipe;
use App\Entity\Joueur;
use App\Exception\GameNotFoundException;
use App\Exception\PlayerNotFoundException;
use App\Exception\TeamNotFoundException;
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
        $normalized = $serializerManager->normalize($campagne, ['ref', 'campagne', 'gamemodel']);
        return new JsonResponse($normalized, 200);
    }

    /**
     * @Route("/getGamePlay",name="get_campaign_by_player",options={"expose"=true})
     * @param SerializerManager $serializerManager
     * @param CampagneRepository $repository
     * @return JsonResponse
     */
    public function getGamePlay(SerializerManager $serializerManager, CampagneRepository $repository)
    {
        $user = $this->getUser();
        try {
            if ($user instanceof Joueur) {
                $team = $user->getEquipe();
                if ($team instanceof Equipe) {
                    $gamePlay = $repository->getCampaignByTeam($team);
                    if ($gamePlay instanceof Campagne) {
                        $arrayResponse = [
                            'player' => $serializerManager->normalize($user, ['profile', 'ref']),
                            'team' => $serializerManager->normalize($user, ['player', 'ref']),
                            'gamePlayModel' => $serializerManager->normalize($gamePlay, ['gamemodel','campagne', 'ref'])
                        ];

                        return new JsonResponse($arrayResponse, 200);
                    } else {
                        throw new GameNotFoundException();
                    }
                } else {
                    throw new TeamNotFoundException();
                }

            } else {
                throw new PlayerNotFoundException();
            }
        } catch (\Exception $exception) {
            $errorArray = [];
            switch (get_class($exception)) {
                case PlayerNotFoundException::class:
                    $errorArray['errors'] = 'Player not found';
                    break;
                case TeamNotFoundException::class :
                    $errorArray['errors'] = 'Team not Found For the connected player';
                    break;
                case GameNotFoundException::class:
                    $errorArray['errors'] = 'Team not Found For this team';
            }
            return new JsonResponse($errorArray, 422);
        }


    }

}