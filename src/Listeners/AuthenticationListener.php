<?php


namespace App\Listeners;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class AuthenticationListener implements AuthenticationSuccessHandlerInterface
{
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * AuthenticationListener constructor.
     * @param RouterInterface $router
     */
    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    /**
     * @param Request $request
     * @param TokenInterface $token
     * @return RedirectResponse
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $response = null;

                if (in_array('ROLE_SUPERADMIN',$token->getRoleNames())){
//                    dump('heresuper');die;
                    $response = new RedirectResponse($this->router->generate('superadmin_index'));

                }else{
                    $response = new RedirectResponse($this->router->generate('admin_index'));
                }


        // redirect
        return $response;
    }
}
