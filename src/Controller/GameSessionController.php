<?php

namespace App\Controller;

use App\Entity\GameSession;
use App\Form\GameSessionType;
use App\Repository\GameSessionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/gamesession")
 */
class GameSessionController extends AbstractController
{
    /**
     * @Route("/", name="game_session_index", methods={"GET"})
     */
    public function index(GameSessionRepository $gameSessionRepository): Response
    {
        return $this->render('game_session/index.html.twig', [
            'game_sessions' => $gameSessionRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="game_session_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $gameSession = new GameSession();
        $form = $this->createForm(GameSessionType::class, $gameSession);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            foreach ($gameSession->getEquipes() as $item){
                $gameSession->addEquipe($item);
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
     */
    public function edit(Request $request, GameSession $gameSession): Response
    {
        $form = $this->createForm(GameSessionType::class, $gameSession);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
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
}