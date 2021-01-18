<?php

namespace App\Controller;

use AndreaSprega\Bundle\BreadcrumbBundle\Annotation\Breadcrumb;
use App\Entity\ActionMarketing;
use App\Form\ActionMarketingCampagneType;
use App\Form\ActionMarketingType;
use App\Repository\ActionMarketingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/actionmarketing")
 * @Breadcrumb({"label" = "home", "route" = "admin_index", "translationDomain" = "domain" })
 */
class ActionMarketingController extends AbstractController
{
    /**
     * @Route("/", name="action_marketing_index", methods={"GET"})
     * @Breadcrumb({
     *
     *   { "label" = "gestion action marketing" }
     * })
     */
    public function index(ActionMarketingRepository $actionMarketingRepository): Response
    {
        return $this->render('action_marketing/index.html.twig', [
            'action_marketings' => $actionMarketingRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="action_marketing_new", methods={"GET","POST"})
     * @Breadcrumb({
     *   { "label" = "gestion action marketing", "route" = "action_marketing_index" },
     *   { "label" = "Nouvelle action" }
     * })
     */
    public function new(Request $request): Response
    {
        $actionMarketing = new ActionMarketing();
        $form = $this->createForm(ActionMarketingCampagneType::class, $actionMarketing);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($actionMarketing);
            $entityManager->flush();

            return $this->redirectToRoute('action_marketing_index');
        }

        return $this->render('action_marketing/new.html.twig', [
            'action_marketing' => $actionMarketing,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="action_marketing_show", methods={"GET"})
     */
    public function show(ActionMarketing $actionMarketing): Response
    {
        return $this->render('action_marketing/show.html.twig', [
            'action_marketing' => $actionMarketing,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="action_marketing_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, ActionMarketing $actionMarketing): Response
    {
        $form = $this->createForm(ActionMarketingCampagneType::class, $actionMarketing);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('action_marketing_index');
        }

        return $this->render('action_marketing/edit.html.twig', [
            'action_marketing' => $actionMarketing,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="action_marketing_delete", methods={"DELETE"})
     */
    public function delete(Request $request, ActionMarketing $actionMarketing): Response
    {
        if ($this->isCsrfTokenValid('delete'.$actionMarketing->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($actionMarketing);
            $entityManager->flush();
        }

        return $this->redirectToRoute('action_marketing_index');
    }
}
