<?php

namespace App\Controller;

use AndreaSprega\Bundle\BreadcrumbBundle\Annotation\Breadcrumb;
use App\Entity\Question;
use App\Entity\Reponse;
use App\Form\QuestionType;
use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

/**
 * @Route("/admin/question")
 * @Breadcrumb({"label" = "home", "route" = "admin_index", "translationDomain" = "domain" })
 */
class QuestionController extends AbstractController
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
     * @Route("/", name="question_index", methods={"GET"})
     * @Breadcrumb({
     *   {  "label" = "gestion des questions/reponses"},
     *
     *
     *     })
     */
    public function index(QuestionRepository $questionRepository): Response
    {
        $owner=$this->security->getUser();
        if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            $owner = $owner->getOwner();
        return $this->render('question/index.html.twig', [
            'questions' => $questionRepository->findByOwner($owner),
        ]);
    }

    /**
     * @Route("/new", name="question_new", methods={"GET","POST"})
     * @Breadcrumb({
     *   {  "label" = "gestion des questions/reponses", "route" = "question_index" },
     *   { "label" = "ajouter une questions" }
     *
     *     })
     */
    public function new(Request $request): Response
    {
        $question = new Question();

        $form = $this->createForm(QuestionType::class, $question);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            if ($this->security->getUser()->getOwner() and in_array('ROLE_GESTION',$this->security->getUser()->getRoles()))
            {
                //gestionnaire
                $question->setOwner($this->security->getUser()->getOwner());
            }else{
                //admin
                $question->setOwner($this->security->getUser());
            }
            $entityManager->persist($question);
            $entityManager->flush();

            return $this->redirectToRoute('question_index');
        }

        return $this->render('question/new.html.twig', [
            'question' => $question,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="question_show", methods={"GET"})
     */
    public function show(Question $question): Response
    {
        return $this->render('question/show.html.twig', [
            'question' => $question,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="question_edit", methods={"GET","POST"})
     * @Breadcrumb({
     *   {  "label" = "gestion des questions/reponses", "route" = "question_index" },
     *   { "label" = "modifier une questions" }
     *
     *     })
     */
    public function edit(Request $request, Question $question, EntityManagerInterface $entityManager): Response
    {
        if (null === $question = $entityManager->getRepository(Question::class)->find($question)) {
            throw $this->createNotFoundException('No task found for id '.$question);
        }
        $originalTags = new ArrayCollection();
        // Create an ArrayCollection of the current Tag objects in the database
        foreach ($question->getReponses() as $tag) {
            $originalTags->add($tag);
        }

        $form = $this->createForm(QuestionType::class, $question);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // remove the relationship between the tag and the Task
            foreach ($originalTags as $tag) {
                if (false === $question->getReponses()->contains($tag)) {
                    // remove the Task from the Tag
                    $tag->getQuestion()->removeElement($question);

                    // if it was a many-to-one relationship, remove the relationship like this
                    $tag->setQuestion(null);

                    $entityManager->persist($tag);

                    // if you wanted to delete the Tag entirely, you can also do that
                    // $entityManager->remove($tag);
                }
            }

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('question_index');
        }

        return $this->render('question/edit.html.twig', [
            'question' => $question,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="question_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Question $question): Response
    {
        if ($this->isCsrfTokenValid('delete'.$question->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($question);
            $entityManager->flush();
        }

        return $this->redirectToRoute('question_index');
    }
}
