<?php

namespace App\Repository;

use App\Entity\ActionMarketing;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ActionMarketing|null find($id, $lockMode = null, $lockVersion = null)
 * @method ActionMarketing|null findOneBy(array $criteria, array $orderBy = null)
 * @method ActionMarketing[]    findAll()
 * @method ActionMarketing[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActionMarketingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ActionMarketing::class);
    }

    // /**
    //  * @return ActionMarketing[] Returns an array of ActionMarketing objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ActionMarketing
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
