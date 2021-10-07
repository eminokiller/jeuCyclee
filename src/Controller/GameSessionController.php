<?php

namespace App\Controller;

use App\Entity\Equipe;
use App\Entity\GameSession;
use App\Entity\Joueur;
use App\Form\GameSessionType;
use App\Repository\GameSessionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use AndreaSprega\Bundle\BreadcrumbBundle\Annotation\Breadcrumb;


/**
 * @Route("/admin/gamesession")
 * @Breadcrumb({"label" = "home", "route" = "admin_index", "translationDomain" = "domain" })
 */
class GameSessionController extends AbstractController
{
    /**
     * @var Security
     */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @Route("/score/{id}", name="game_session_score", methods={"GET","POST"}, requirements={"id"="\d+"})
     *
     */
    public function score(GameSession $gameSession, GameSessionRepository $gameSessionRepository, EntityManagerInterface $em): Response
    {
        $topScore = $gameSessionRepository->getBestScoreBySession($gameSession);
        $dataBestEquipe = [];
        $dataTopThreeScore = [];
        $dataAllScoresEquipe = [];
        $bestEquipe = '';
        if($topScore && count($topScore))
        {
            $equipe = $em->getRepository(Equipe::class)->find($topScore[0]['id']);
            if($equipe && $equipe instanceof  Equipe)
            {
                $bestEquipe = $equipe->getLibelle();
                foreach ($equipe->getJoueurs() as $joueur)
                {
                    /** @var Joueur $joueur */
                    $dataBestEquipe[] = [
                        'name' => $joueur->getNom(),
                        'score' => (int)$joueur->getScore()
                    ];
                }
            }
        }
        $topThreeScores = $gameSessionRepository->getThreeBestScoreBySession($gameSession);
        if($topThreeScores && count($topThreeScores))
        {
            foreach ($topThreeScores as $topScorePlayer)
            {
                /** @var Joueur $joueur */
                $joueur = $em->getRepository(Joueur::class)->find($topScorePlayer['id']);
                $dataTopThreeScore[] = [
                    'name' => $joueur->getNom(),
                    'score' => (int)$topScorePlayer['moyenneScore'],
                    'equipe' => $joueur->getEquipe()->getLibelle()
                ];
            }

        }
        $allResults = $gameSessionRepository->getAllScoresBySession($gameSession);
        if($allResults && count($allResults))
        {
            foreach ($allResults as $result)
            {
                /** @var Equipe $equipe */
                $equipe = $em->getRepository(Equipe::class)->find($result['id']);
                $members = [];
                foreach ($equipe->getJoueurs() as $joueur)
                {
                    $members[] = [
                        'name' => $joueur->getNom(),
                        'score' => (int)$joueur->getScore()
                    ];
                }
                $dataAllScoresEquipe[] = [
                    'moyenneScore' => (int)$result['moyenneScore'],
                    'equipe' => $equipe->getLibelle(),
                    'members' => $members
                ];
            }
        }

        return $this->render('game_session/score.html.twig', [
            'game_session' => $gameSession,
            'topScore' => $topScore && count($topScore) ? (int)$topScore[0]['moyenneScore'] : 0,
            'bestEquipe' => $bestEquipe,
            'dataBestEquipe' => $dataBestEquipe,
            'dataTopThreeScore' => $dataTopThreeScore,
            'dataAllScoresEquipe' => $dataAllScoresEquipe

        ]);
    }

    /**
     * @Route("/", name="game_session_index", methods={"GET"})
     * @Breadcrumb({
     *   { "label" = "gestion des sessions" },
     *
     *     })
     */
    public function index(GameSessionRepository $gameSessionRepository): Response
    {
        $owner=$this->security->getUser();
        if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            $owner = $owner->getOwner();

        return $this->render('game_session/index.html.twig', [
            'game_sessions' => $gameSessionRepository->findByOwner($owner),
        ]);
    }

    /**
     * @Route("/new", name="game_session_new", methods={"GET","POST"})
     * @Breadcrumb({
     *   { "label" = "gestion des sessions", "route" = "game_session_index" },
     *   { "label" = "ajouter une session" }
     *
     *     })
     */
    public function new(Request $request): Response
    {
        $gameSession = new GameSession();
        $form = $this->createForm(GameSessionType::class, $gameSession);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            foreach ($gameSession->getCampagnes() as $item){
                $gameSession->addCampagne($item);
            }
//            dump(!in_array('ROLE_GESTION',$this->security->getUser()->getRoles()));die;
//            dump($this->security->getUser()->getOwner());die;
            if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            {
                //gestionnaire
                $gameSession->setOwner($this->security->getUser()->getOwner());
            }else{
                //admin
                $gameSession->setOwner($this->security->getUser());
            }

            $entityManager->persist($gameSession);
            $entityManager->flush();

            return $this->redirectToRoute('game_session_index');
        }

        return $this->render('game_session/new.html.twig', [
            'game_session' => $gameSession,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="game_session_show", methods={"GET"})
     */
    public function show(GameSession $gameSession): Response
    {
        return $this->render('game_session/show.html.twig', [
            'game_session' => $gameSession,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="game_session_edit", methods={"GET","POST"})
     * @Breadcrumb({
     *   { "label" = "gestion des sessions", "route" = "game_session_index" },
     *   { "label" = "modifier une session" }
     *
     *     })
     */
    public function edit(Request $request, GameSession $gameSession): Response
    {
        $form = $this->createForm(GameSessionType::class, $gameSession);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            foreach ($gameSession->getCampagnes() as $item){
                $gameSession->addCampagne($item);
            }
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('game_session_index');
        }

        return $this->render('game_session/edit.html.twig', [
            'game_session' => $gameSession,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="game_session_delete", methods={"DELETE"})
     */
    public function delete(Request $request, GameSession $gameSession): Response
    {
        if ($this->isCsrfTokenValid('delete'.$gameSession->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($gameSession);
            $entityManager->flush();
        }

        return $this->redirectToRoute('game_session_index');
    }

    /**
     * @Route("/{id}/toZero", name="game_session_reset", methods={"GET","POST"})
     */
    public function remiseZero(GameSession $gameSession): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        try{
            foreach ($gameSession->getCampagnes() as $campagne){
                foreach ($campagne->getEquipes() as $equipe){
                    foreach ($equipe->getJoueurs() as $joueur){
                        $joueur->setScore(0);
                        $entityManager->persist($joueur);
                    }
                }
            }
            $entityManager->flush();
            $this->addFlash('success','La session '. $gameSession->getLibelle() .' est mise à zéro');
        }catch (\Exception $e){
            $this->addFlash('error', $e->getMessage());
        }
        return $this->redirectToRoute('game_session_index');

    }
}
