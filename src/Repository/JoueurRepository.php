<?php

namespace App\Repository;

use App\Entity\Campagne;
use App\Entity\Equipe;
use App\Entity\GameSession;
use App\Entity\Joueur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Joueur|null find($id, $lockMode = null, $lockVersion = null)
 * @method Joueur|null findOneBy(array $criteria, array $orderBy = null)
 * @method Joueur[]    findAll()
 * @method Joueur[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class JoueurRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Joueur::class);
    }

    // /**
    //  * @return Joueur[] Returns an array of Joueur objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('j')
            ->andWhere('j.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('j.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
    public function getBestScore($user){

    }

    public function findOneBySomeField($value): ?Joueur
    {
        return $this->createQueryBuilder('j')
            ->andWhere('j.Nom = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
     * @param $id
     *
     */
    public function findPlayersBySession($id){

            $qb = $this->_em->createQueryBuilder();
        $qb
            ->select('j')
            ->from(Joueur::class,'j')
            ->from(GameSession::class,'g')
            ->where('g.id = :id')
            ->setParameter('id',$id)
            ->join('g.campagnes','c')
            ->join(Equipe::class,'e','WITH','j.equipe = e.id')


            ->where('c.equipes = e.id')


//            ->select('joueur')
//            ->from(Joueur::class,'joueur')
//            ->join(Equipe::class,'e','WITH','joueur.equipe = e.id')
//            ->join(Campagne::class,'c','WITH','c.equipes = e.id')
//            ->join(GameSession::class,'g','WITH','g.campagnes = c.id')
//            ->where('g.id = :idsession')
//            ->setParameter('idsession',$gameSession->getId())



        ;


//            ->join('joueur.equipe','e','WITH','e.id = joueur.id')
//            ->addSelect('c','e')
//            ->from(Campagne::class,'c')
//            ->join('c.equipes','eq','WITH','eq.id = e.id')
//            ->join('eq.gameSession','g','WITH','g.id='.$gameSession->getId());
//






                return ($qb->getQuery()->getResult());



    }

}
