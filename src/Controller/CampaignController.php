<?php
/**
 * Created by PhpStorm.
 * User: mohamedchehimi
 * Date: 15/01/21
 * Time: 00:11
 */

namespace App\Controller;


use App\Entity\Campagne;
use App\Form\CampagneConfigType;
use App\Form\CampagneType;
use App\Form\TeamCampagneType;
use App\Service\SerializerManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CampaignController
 * @package App\Controller
 * @Route("/admin/campaign")
 */
class CampaignController extends AbstractController
{
    /**
     * @Route("/", name="campaign_index")
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function index(EntityManagerInterface $entityManager)
    {
        $campaigns = $entityManager->getRepository(Campagne::class)->findAll();
        return $this->render('campaign/index.html.twig', ['campaigns' => $campaigns]);
    }

    /**
     * @Route("/new", name="campaign_new",methods={"GET", "POST"})
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return object|Response
     */
    public function create(Request $request, EntityManagerInterface $entityManager)
    {
        $campagne = new Campagne();
        $form = $this->createForm(CampagneType::class, $campagne);
        $status = Response::HTTP_OK;
        $form->handleRequest($request);
        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                try {
                    $entityManager->persist($campagne);
                    $entityManager->flush();
                    $status = Response::HTTP_CREATED;
                    $this->redirectToRoute('campaign_index');
                } catch (\Exception $exception) {
                    $status = Response::HTTP_UNPROCESSABLE_ENTITY;
                }
            } else {
                $status = Response::HTTP_BAD_REQUEST;
            }
        }
        return $this->render('campaign/new.html.twig', [
            'form' => $form->createView()
        ])->setStatusCode($status);

    }

    /**
     * @Route("/update/{id}", name="campaign_update",methods={"GET", "POST"})
     * @param Request $request
     * @param Campagne $campagne
     * @param EntityManagerInterface $entityManager
     * @return object|Response
     */
    public function update(Request $request, Campagne $campagne, EntityManagerInterface $entityManager)
    {
        $form = $this->createForm(CampagneType::class, $campagne);
        $status = Response::HTTP_OK;
        $form->handleRequest($request);
        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                try {
                    $entityManager->persist($campagne);
                    $entityManager->flush();
                    $status = Response::HTTP_CREATED;
                } catch (\Exception $exception) {
                    $status = Response::HTTP_UNPROCESSABLE_ENTITY;
                }
            } else {
                $status = Response::HTTP_BAD_REQUEST;
            }
        }
        return $this->render('campaign/edit.html.twig', [
            'form' => $form->createView(),
            'campagne' => $campagne
        ])->setStatusCode($status);
    }

    /**
     * @Route("/{id}", name="campaign_delete", methods={"DELETE"})
     * @param Request $request
     * @param Campagne $campagne
     * @return Response
     */
    public function delete(Request $request, Campagne $campagne): Response
    {
        if ($this->isCsrfTokenValid('delete' . $campagne->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($campagne);
            $entityManager->flush();
        }

        return $this->redirectToRoute('campaign_index');
    }

    /**
     * @Route("/configure/{id}", name="campaign_configure",methods={"GET", "POST"})
     * @param Campagne $campagne
     * @return Response
     */
    public function configure(Request $request, Campagne $campagne, SerializerManager $serializerManager, EntityManagerInterface $entityManager)
    {
        $form = $this->createForm(CampagneConfigType::class, $campagne);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            try{
                $entityManager->flush();
            } catch (\Exception $exception){

            }
        }
        $normalized = $serializerManager->normalize($campagne, ['ref', 'campagne']);
        return $this->render('campaign/configure.html.twig', ['campagne' => $normalized, 'form' => $form->createView()]);
    }

    /**
     * @Route("/configure-team/{id}", name="campaign_configure_team",methods={"GET", "POST"})
     * @param Request $request
     * @param Campagne $campagne
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function configureTeam(Request $request, Campagne $campagne, EntityManagerInterface $entityManager)
    {
        $form =$this->createForm(TeamCampagneType::class, $campagne);
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            try{
                $entityManager->flush();
            }catch (\Exception $exception){

            }
        }
        return $this->render('campaign/affect.html.twig', [
            'form' => $form->createView(),
            'campagne' => $campagne
        ]);
    }
}