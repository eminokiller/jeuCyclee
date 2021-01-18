<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);

        $user = new Admin();
        $pwd = $this->passwordEncoder->encodePassword($user,'admin');
        $user->setPassword($pwd);
        $user->setEmail('admin@admin.com');

        $user->setRoles(array('ROLE_ADMIN'));
        //echo 'hello';die;
        $manager->persist($user);
        $manager->flush();
    }
}
