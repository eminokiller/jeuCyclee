<?php

namespace App\Controller;

use AndreaSprega\Bundle\BreadcrumbBundle\Annotation\Breadcrumb;
use App\Entity\Equipe;
use App\Form\EquipeType;
use App\Repository\EquipeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

/**
 * @Route("/admin/equipe")
 * @Breadcrumb({"label" = "home", "route" = "admin_index", "translationDomain" = "domain" })
 */
class EquipeController extends AbstractController
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
     * @Route("/", name="equipe_index", methods={"GET"})
     * @Breadcrumb({"label" = "gestion des équipes"})
     */
    public function index(EquipeRepository $equipeRepository): Response
    {
        $owner=$this->security->getUser();
        if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            $owner = $owner->getOwner();
        return $this->render('equipe/index.html.twig', [
            'equipes' => $equipeRepository->findByOwner($owner),
        ]);
    }

    /**
     * @Route("/new", name="equipe_new", methods={"GET","POST"})
     * @Breadcrumb({
     *   {  "label" = "gestion des équipes", "route" = "equipe_index" },
     *   { "label" = "ajouter une equipe" }
     *
     *     })
     */
    public function new(Request $request): Response
    {
        $equipe = new Equipe();
        $form = $this->createForm(EquipeType::class, $equipe);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            foreach ($equipe->getJoueurs() as $item){
                $equipe->addJoueur($item);
            }
            if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            {
                //gestionnaire
                $equipe->setOwner($this->security->getUser()->getOwner());
            }else{
                //admin
                $equipe->setOwner($this->security->getUser());
            }
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($equipe);
            $entityManager->flush();

            return $this->redirectToRoute('equipe_index');
        }

        return $this->render('equipe/new.html.twig', [
            'equipe' => $equipe,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="equipe_show", methods={"GET"})
     */
    public function show(Equipe $equipe): Response
    {
        return $this->render('equipe/show.html.twig', [
            'equipe' => $equipe,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="equipe_edit", methods={"GET","POST"})
     * @Breadcrumb({
     *   {  "label" = "gestion des équipes", "route" = "equipe_index" },
     *   { "label" = "modifier une equipe" }
     *
     *     })
     */
    public function edit(Request $request, Equipe $equipe): Response
    {
        $form = $this->createForm(EquipeType::class, $equipe);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            foreach ($equipe->getJoueurs() as $item){
                $equipe->addJoueur($item);
            }

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('equipe_index');
        }

        return $this->render('equipe/edit.html.twig', [
            'equipe' => $equipe,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="equipe_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Equipe $equipe): Response
    {
        if ($this->isCsrfTokenValid('delete'.$equipe->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($equipe);
            $entityManager->flush();
        }

        return $this->redirectToRoute('equipe_index');
    }
}
