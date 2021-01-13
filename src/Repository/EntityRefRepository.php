<?php

namespace App\Repository;

use App\Entity\EntityRef;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method EntityRef|null find($id, $lockMode = null, $lockVersion = null)
 * @method EntityRef|null findOneBy(array $criteria, array $orderBy = null)
 * @method EntityRef[]    findAll()
 * @method EntityRef[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EntityRefRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EntityRef::class);
    }

    // /**
    //  * @return EntityRef[] Returns an array of EntityRef objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EntityRef
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
