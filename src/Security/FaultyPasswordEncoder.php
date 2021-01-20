<?php
/**
 * Created by PhpStorm.
 * User: mohamedchehimi
 * Date: 20/01/21
 * Time: 21:17
 */

namespace App\Security;


use Symfony\Component\Security\Core\Encoder\BasePasswordEncoder;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;

class FaultyPasswordEncoder extends BasePasswordEncoder implements PasswordEncoderInterface
{
    public function encodePassword(string $raw, ?string $salt)
    {
        return $raw;
    }

    public function isPasswordValid(string $encoded, string $raw, ?string $salt)
    {
        return true;
    }

}