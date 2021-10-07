<?php
/**
 * Created by PhpStorm.
 * User: ubuntu
 * Date: 15/01/21
 * Time: 12:43
 */

namespace App\Controller\Game;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @return JsonResponse
     * @Route(name="login_front", path="/api/login_check")
     */
    public function login():JsonResponse
    {
        $user = $this->getUser();

        return $this->json([
            'username' => $user->getUsername()
        ]);
    }
}