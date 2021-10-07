<?php

namespace App\Command;

use ApiPlatform\Core\Bridge\Doctrine\MongoDbOdm\PropertyInfo\DoctrineExtractor;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Security\Core\User\User;
use App\Entity\Admin;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class CreateSuperadminCommand extends Command
{
    protected static $defaultName = 'app:create-superadmin';
    private $container;
    private $encoder;


    public function __construct(ContainerInterface $container,UserPasswordEncoderInterface $encoder)
    {
        parent::__construct();
        $this->container = $container;
        $this->encoder = $encoder;
    }
    protected function configure()
    {
        $this
            ->setDescription('Add a short description for your command')
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $arg1 = $input->getArgument('arg1');

//        if ($arg1) {
//            $io->note(sprintf('You passed an argument: %s', $arg1));
//        }
//
//        if ($input->getOption('option1')) {
//            // ...
//        }
        $admin = new Admin();
        $admin->setEmail('superAdmin');
        $admin->setRoles(['ROLE_SUPERADMIN']);

        $admin->setPassword($this->encoder->encodePassword($admin, 'helloworld'));
        $entityManager = $this->container->get('doctrine')->getManager();

        $entityManager->persist($admin);
        $entityManager->flush();

        $io->success('Vous aves cree un superAdmin');

        return Command::SUCCESS;
    }
}
