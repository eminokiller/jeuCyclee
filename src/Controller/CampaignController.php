<?php
/**
 * Created by PhpStorm.
 * User: mohamedchehimi
 * Date: 15/01/21
 * Time: 00:11
 */

namespace App\Controller;


use App\Entity\Campagne;
use App\Form\CampagneType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CampaignController
 * @package App\Controller
 * @Route("/campaign")
 */
class CampaignController extends AbstractController
{
    /**
     * @Route("/campaign", name="campaign_index")
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function index(EntityManagerInterface $entityManager)
    {
        $campaigns = $entityManager->getRepository(Campagne::class)->findAll();
        return $this->render('campaign/index.html.twig', ['campaigns' => $campaigns]);
    }

    /**
     * @Route("/campaign/new", name="campaign_new",methods={"GET", "POST"})
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return object|Response
     */
    public function create(Request $request, EntityManagerInterface $entityManager)
    {
        $campagne = new Campagne();
        $form = $this->createForm(CampagneType::class, $campagne);
        $status = Response::HTTP_OK;
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
        return $this->render('campaign/new.html.twig', [
            'form' => $form->createView()
        ])->setStatusCode($status);

    }

    /**
     * @Route("/campaign/update/{id}", name="campaign_update",methods={"GET", "POST"})
     * @param Campagne $campagne
     * @param EntityManagerInterface $entityManager
     * @return object|Response
     */
    public function update(Campagne $campagne, EntityManagerInterface $entityManager)
    {
        $form = $this->createForm(CampagneType::class, $campagne);
        $status = Response::HTTP_OK;
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
}