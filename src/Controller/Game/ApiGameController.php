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
use App\Entity\Reponse;
use App\Exception\GameNotFoundException;
use App\Exception\PersistScoreException;
use App\Exception\PlayerNotFoundException;
use App\Exception\TeamNotFoundException;
use App\Repository\CampagneRepository;
use App\Repository\JoueurRepository;
use App\Repository\ReponseRepository;
use App\Service\SerializerManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
                            'gamePlayModel' => $serializerManager->normalize($gamePlay, ['gamemodel', 'campagne', 'ref'])
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

    /**
     * @Route("/checkQuestion/{id}",name="check_question_status",options={"expose"=true})
     * @param ActionMarketing $actionMarketing
     * @param Request $request
     * @return JsonResponse
     */
    public function checkQuestion(ActionMarketing $actionMarketing, Request $request, ReponseRepository $repository)
    {
        $answerBody = $request->request->all();
        foreach ($answerBody['task']['questions'] as $question){
            foreach ($question['reponses'] as $reponse){

            }
        }
        $testAll = array_reduce($answerBody['task']['questions'], function ($test, $question) use ($repository) {
            $test = $test && array_reduce($question['reponses'], function ($test2, $reponse) use ($repository) {
                    $reponseEntity = $repository->find(intval($reponse['id']));
                    $status = isset($reponse['status']) ? 1 : 0;
                    $test2 = $test2 && (($reponseEntity instanceof Reponse) ? ($status == $reponseEntity->getStatus()) : false);
                    return $test2;
                }, true);
            return $test;
        }, true);
        $status = $testAll ? 201 : 422;
        return new JsonResponse(['status' => 1, 'answer' => $answerBody], $status);
    }

    /**
     * @Route("/setScore",name="set_score",options={"expose"=true})
     * @param SerializerManager $serializerManager
     *
     * @return JsonResponse
     */
    public function setScore(SerializerManager $serializerManager,Request $request)
    {
        $user = $this->getUser();
        $bestScore = 0;
        try {

            if ($user instanceof Joueur) {

                $user->setScore($request->get('score'));
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($user);
                $entityManager->flush();
                //dump($user->getEquipe()->getId());die;
                $bestScore = $this->getDoctrine()->getRepository(Joueur::class)->getBestScore($user->getEquipe()->getId());
                //getMoyenneScoreParEquipe
                $moyenne = $this->getDoctrine()->getRepository(Joueur::class)->getMoyenneScoreParEquipe($user->getEquipe()->getId());
            }


        } catch (\Exception $exception) {

                throw new PersistScoreException();
        }
        return new JsonResponse (['status' => 1,'bestScore' => $bestScore,'moyenne' => number_format($moyenne[1],1)]);
    }

}