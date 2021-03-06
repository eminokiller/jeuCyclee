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
use Symfony\Component\Security\Core\Security;

/**
 * @Route("/admin/actionmarketing")
 * @Breadcrumb({"label" = "home", "route" = "admin_index", "translationDomain" = "domain" })
 */
class ActionMarketingController extends AbstractController
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
     * @Route("/", name="action_marketing_index", methods={"GET"})
     * @Breadcrumb({
     *
     *   { "label" = "gestion action marketing" }
     * })
     */
    public function index(ActionMarketingRepository $actionMarketingRepository): Response
    {
        $owner=$this->security->getUser();
        if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            $owner = $owner->getOwner();
        return $this->render('action_marketing/index.html.twig', [
            'action_marketings' => $actionMarketingRepository->findByOwner($owner),
        ]);
    }

    /**
     * @Route("/new", name="action_marketing_new", methods={"GET","POST"})
     * @Breadcrumb({
     *   { "label" = "gestion action marketing", "route" = "action_marketing_index" },
     *   { "label" = "ajouter une action" }
     * })
     */
    public function new(Request $request): Response
    {
        $actionMarketing = new ActionMarketing();
        $form = $this->createForm(ActionMarketingCampagneType::class, $actionMarketing);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->addFlash('success', 'Action bien ajouter');
            $entityManager = $this->getDoctrine()->getManager();
            if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            {
                //gestionnaire
                $actionMarketing->setOwner($this->security->getUser()->getOwner());
            }else{
                //admin
                $actionMarketing->setOwner($this->security->getUser());
            }

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
     * @Breadcrumb({
     *   { "label" = "gestion action marketing", "route" = "action_marketing_index" },
     *   { "label" = "modifier action" }
     * })
     */
    public function edit(Request $request, ActionMarketing $actionMarketing): Response
    {
        $form = $this->createForm(ActionMarketingCampagneType::class, $actionMarketing);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            $this->addFlash('success', 'Action bien mis ?? jour');
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
        $this->addFlash('success', 'a ??t?? supprimer');
        return $this->redirectToRoute('action_marketing_index');
    }
}
