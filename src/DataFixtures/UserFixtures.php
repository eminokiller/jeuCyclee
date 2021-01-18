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
        $email_admin = ['amine.bouras09@gmail.com','hugo.r@pixelstrade.com','yasmine.t@pixelstrade.com','bilal.fernani@sanofi.com','selma.rouchiche2@sanofi.com'];
        foreach ($email_admin as $email_){
            $exist = $manager->getRepository(Admin::class)->findOneByEmail($email_);
            if (!$exist){
                $user = new Admin();
                $pwd = $this->passwordEncoder->encodePassword($user,'admin');
                $user->setPassword($pwd);
                $user->setEmail($email_);
                $user->setRoles(array('ROLE_ADMIN'));
                $manager->persist($user);
            }
        }
        $manager->flush();
    }
}
