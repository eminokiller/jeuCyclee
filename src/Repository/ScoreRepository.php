<?php

namespace App\Repository;

use App\Entity\Equipe;
use App\Entity\Joueur;
use App\Entity\Score;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Score|null find($id, $lockMode = null, $lockVersion = null)
 * @method Score|null findOneBy(array $criteria, array $orderBy = null)
 * @method Score[]    findAll()
 * @method Score[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScoreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Score::class);
    }

    public function getAverageScoreByTeam(Equipe $equipe = null)
    {
        $query = $this->createQueryBuilder('score')
            ->select('COUNT(score) AS players, SUM(score.value) as totalScore, AVG(score.value) as moyenneScore')
            ->join(Joueur::class, 'joueur', Join::WITH, 'score.joueur = joueur.id');
        if($equipe)
        {
            $query->where('joueur.equipe = :equipe')
                ->setParameter('equipe', $equipe);
        }

        return $query->orderBy('moyenneScore', 'DESC')
            ->groupBy('joueur.equipe')
            ->getQuery()
            ->getArrayResult()
        ;
    }

    // /**
    //  * @return Score[] Returns an array of Score objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Score
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
