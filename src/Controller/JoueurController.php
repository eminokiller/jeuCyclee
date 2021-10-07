<?php

namespace App\Controller;

use AndreaSprega\Bundle\BreadcrumbBundle\Annotation\Breadcrumb;
use App\Entity\Joueur;
use App\Form\JoueurType;
use App\Repository\JoueurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

/**
 * @Route("/admin/joueur")
 * @Breadcrumb({"label" = "home", "route" = "admin_index", "translationDomain" = "domain" })
 */
class JoueurController extends AbstractController
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
     * @Route("/", name="joueur_index", methods={"GET"})
     * @Breadcrumb({
     *   {  "label" = "gestion des joueurs"},
     *
     *
     *     })
     */
    public function index(JoueurRepository $joueurRepository): Response
    {
        $owner=$this->security->getUser();
        if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            $owner = $owner->getOwner();
        return $this->render('joueur/index.html.twig', [
            'joueurs' => $joueurRepository->findByOwner($owner),
        ]);
    }

    /**
     * @Route("/new", name="joueur_new", methods={"GET","POST"})
     * @Breadcrumb({
     *   {  "label" = "gestion des questions/reponses", "route" = "joueur_index" },
     *   { "label" = "ajouter un joueur" }
     *
     *     })
     */
    public function new(Request $request): Response
    {
        $joueur = new Joueur();
        $form = $this->createForm(JoueurType::class, $joueur);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            {
                //gestionnaire
                $joueur->setOwner($this->security->getUser()->getOwner());
            }else{
                //admin
                $joueur->setOwner($this->security->getUser());
            }
            $entityManager->persist($joueur);
            $entityManager->flush();

            return $this->redirectToRoute('joueur_index');
        }

        return $this->render('joueur/new.html.twig', [
            'joueur' => $joueur,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="joueur_show", methods={"GET"})
     * @Breadcrumb({
     *   {  "label" = "gestion des questions/reponses", "route" = "question_index" },
     *   { "label" = "modifier une questions" }
     *
     *     })
     */
    public function show(Joueur $joueur): Response
    {
        return $this->render('joueur/show.html.twig', [
            'joueur' => $joueur,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="joueur_edit", methods={"GET","POST"})
     * @Breadcrumb({
     *   {  "label" = "gestions des joueurs", "route" = "question_index" },
     *   { "label" = "modifier un joueur" }
     *
     *     })
     */
    public function edit(Request $request,Joueur $joueur): Response
    {


        //dump($joueur);die;
        $form = $this->createForm(JoueurType::class, $joueur);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('joueur_index');
        }

        return $this->render('joueur/edit.html.twig', [
            'joueur' => $joueur,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="joueur_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Joueur $joueur): Response
    {
        if ($this->isCsrfTokenValid('delete'.$joueur->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($joueur);
            $entityManager->flush();
        }

        return $this->redirectToRoute('joueur_index');
    }
}
