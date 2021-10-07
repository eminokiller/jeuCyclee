<?php
/**
 * Created by PhpStorm.
 * User: ubuntu
 * Date: 17/01/21
 * Time: 02:46
 */

namespace App\Controller\Game;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GameController
 * @package App\Controller\Game
 * @Route("/")
 */
class GameController extends AbstractController
{
    /**
     * @Route("/", name="game_index")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index()
    {
        return $this->render('game/base.html.twig', []);
    }
}