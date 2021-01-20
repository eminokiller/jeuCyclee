<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=AdminRepository::class)
 * @UniqueEntity(fields="email", message="Sorry, this email address is already in use.", groups={"admin","joueur","user"})
 */
class Admin extends User
{
    public function __construct()
    {
        $this->roles = ['ROLE_ADMIN'];
    }
}
